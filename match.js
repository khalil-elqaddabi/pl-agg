// Exercise 01 — Active Members by City
// Medium

// Collection: members

// بغينا نجيبو الأعضاء اللي:
// - الحساب ديالهم نشيط (active).
// - ساكنين فـ CASABLANCA أو RABAT.
// الهدف: تتدرب على الجمع بين شروط مختلفة واستعمال $in.
console.log("==============ex1")
printjson(
db.members.aggregate([

    {$match : { 
        active : true,
        city: {
            $in:["CASABLANCA","RABAT"]
        }
        
    }}
]).toArray()
)
// Exercise 02 — Expensive Returned Loans
// Medium

// Collection: loans

// بغينا نجيبو القروض اللي:
// - الحالة ديالها RETURNED.
// - المبلغ (feeCents) أكبر أو يساوي 3000.
// - المدة (durationDays) أكبر من 2.
// الهدف: تتدرب على $gte و$gt مع شروط متعددة.
console.log("==============ex2")
printjson(
    db.loans.aggregate([
       { $match: {
            status : "RETURNED",
            feeCents : {$gte:3000},
            durationDays : {$gt:2}
        }}
    ]).toArray()
)

// Exercise 03 — Equipment Filtering
// Medium

// Collection: equipments

// بغينا نجيبو المعدات اللي:
// - ماشي مؤرشفة (archived).
// - الفئة ديالها VIDEO أو AUDIO.
// - الاسم ديالها ماشي Enceinte.
// الهدف: تتدرب على $in و$ne مع شرط Boolean.
console.log("==============ex3")
printjson(
    db.equipments.aggregate([
        {$match: {
            archived: false,
            category : {$in:["VIDEO","AUDIO"]},
            name : {$ne:"Enceinte"}
        }}
    ]).toArray()
)

// Exercise 04 — Maintenance Investigation
// Challenge

// Collection: maintenance

// بغينا نجيبو تدخلات الصيانة اللي:
// - الحالة ديالها DONE.
// - التكلفة ديالها أكبر من 2000 وأقل من 6000.
// - equipmentId ديالها ماشي EQ-006 وماشي EQ-ABSENT.
// الهدف: تستعمل $and و$nin أو الشروط المناسبة لتحقيق نفس النتيجة.
console.log("==============ex4")
printjson(
    db.maintenance.aggregate([
        {$match:{
            status : "DONE",
            $and:[ 
                {costCents:{$gt:2000}},
                {costCents:{$lt:6000}}
            ],
            equipmentId:{$nin:["EQ-006","EQ-ABSENT"]}
        }}
    ]).toArray()
)