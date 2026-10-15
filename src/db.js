import Dexie from 'dexie/dist/dexie.js'
export const db = new Dexie('SmaCbtDatabase')
db.version(1).stores({
  users: '++id,&username,role,isActive', students: '++id,&nis,&nisn,name,classId,isActive', teachers: '++id,&teacherCode,name,isActive',
  classes: '++id,&name,grade,major,schoolYearId', subjects: '++id,&code,name,grade', schoolYears: '++id,&name,isActive',
  questions: '++id,subjectId,grade,type,difficulty,status', examPackages: '++id,&code,subjectId,startAt,endAt,status', examQuestions: '++id,examPackageId,questionId,order',
  examAssignments: '++id,examPackageId,studentId,status', examAttempts: '++id,[examPackageId+studentId],status,startedAt,submittedAt', examAnswers: '++id,[attemptId+questionId],attemptId,questionId',
  examResults: '++id,attemptId,studentId,score,publishedAt', appSettings: '&key', auditLogs: '++id,actorId,action,createdAt'
})
export async function seed(){
  if(await db.users.count()) return
  await db.transaction('rw',db.users,db.students,db.classes,db.subjects,db.questions,db.examPackages,db.examQuestions,db.schoolYears,async()=>{
    const yearId=await db.schoolYears.add({name:'2025/2026',isActive:true})
    const classId=await db.classes.add({name:'XII-1',grade:'XII',major:'Umum',schoolYearId:yearId})
    await db.users.bulkAdd([{username:'admin',password:'admin123',name:'Administrator',role:'admin',isActive:true},{username:'guru',password:'guru123',name:'Budi Santoso, S.Pd.',role:'teacher',isActive:true},{username:'siswa',password:'siswa123',name:'Nadia Putri',role:'student',studentId:1,isActive:true}])
    await db.students.add({nis:'2025001',nisn:'0098765432',name:'Nadia Putri',classId,isActive:true})
    const subjectId=await db.subjects.add({code:'MTK',name:'Matematika',grade:'XII',isActive:true})
    const qs=[['Berapakah hasil dari 8 × 7?', ['54','56','64','48'],1],['Jika x + 5 = 12, maka nilai x adalah…',['5','6','7','8'],2],['Berapakah akar kuadrat dari 81?',['7','8','9','10'],2]]
    const ids=[]
    for(const [text,options,answer] of qs) ids.push(await db.questions.add({subjectId,grade:'XII',topic:'Aljabar',difficulty:'mudah',type:'single',text,options,answer,points:10,status:'active',explanation:''}))
    const startAt=new Date(Date.now()-3600000).toISOString(),endAt=new Date(Date.now()+86400000).toISOString()
    const examId=await db.examPackages.add({code:'MTK-001',name:'Latihan Matematika',description:'Ujian demonstrasi',subjectId,classIds:[classId],startAt,endAt,duration:30,passScore:70,status:'active',shuffleQuestions:false,shuffleOptions:false,showResults:true,published:true})
    await db.examQuestions.bulkAdd(ids.map((questionId,i)=>({examPackageId:examId,questionId,order:i,points:10})))
  })
}
