const fs=require('fs'),assert=require('node:assert/strict'),path=require('path');
const root=path.resolve(__dirname,'..'),data=JSON.parse(fs.readFileSync(path.join(root,'trip-data.json'),'utf8'));
assert.equal(data.schemaVersion,1);assert.equal(data.schedule.length,3);
assert.match(data.dates.start,/^\d{4}-\d{2}-\d{2}$/);assert.match(data.dates.end,/^\d{4}-\d{2}-\d{2}$/);
const ids=new Set(data.places.map(p=>p.id));assert.equal(ids.size,data.places.length);assert(ids.has(data.hotelId));
for(const p of data.places){assert(p.name&&p.address&&p.note);if(p.lat===null&&p.lng===null){assert.equal(p.verification.status,'pending');}else{assert(Number.isFinite(p.lat)&&Math.abs(p.lat)<=90);assert(Number.isFinite(p.lng)&&Math.abs(p.lng)<=180);}assert(['pending','confirmed'].includes(p.verification.status));if(p.verification.status==='confirmed'){assert(p.verification.source);assert.match(p.verification.checkedAt,/^\d{4}-\d{2}-\d{2}$/);}}
for(const day of data.schedule){assert(day.date);assert(day.items.some(x=>x.kind==='飲料'),'每天需有飲料');for(const x of day.items){assert(x.time&&x.title&&x.note&&x.move);assert(x.id===null||ids.has(x.id),'Unknown place '+x.id);}}
for(const id of data.extras)assert(ids.has(id));assert.equal(new Set(data.checklist.map(x=>x.id)).size,data.checklist.length);
for(const name of ['index.html','styles.css','app.js','.nojekyll'])assert(fs.existsSync(path.join(root,name)));
console.log('PASS: JSON syntax, three days, daily drinks, stable IDs, navigation references, coordinates and verification records');
