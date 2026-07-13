const fmt=n=>Number(n).toLocaleString('ko-KR');
const changeClass=v=>v>0?'positive':v<0?'negative':'';
let DATA=[];
function render(d,index){
 document.title=`${d.dong} 상권분석 | 미추홀구`;
 document.querySelector('#sectionNo').textContent=`참고 ${index+1}`;
 document.querySelector('#dongTitle').textContent=d.dong;
 document.querySelector('#quadrant').textContent=d.quadrant;
 document.querySelector('#baseDate').textContent=`기준: ${d.baseDate}`;
 document.querySelector('#totalSales').textContent=fmt(d.totalSales);
 document.querySelector('#stores').textContent=fmt(d.stores);
 document.querySelector('#floating').textContent=fmt(d.floatingPopulation);
 document.querySelector('#leading').textContent=d.leadingIndustry;
 document.querySelector('#leadingShare').textContent=`매출비중 ${d.leadingShare}%`;
 document.querySelector('#summary').textContent=`총 추정매출 ${fmt(d.totalSales)}억원, 총 업소수 ${fmt(d.stores)}개, 일평균 유동인구 ${fmt(d.floatingPopulation)}명이며, 리딩 업종은 ${d.leadingIndustry}로 매출비중 ${d.leadingShare}% 수준입니다.`;
 const sc=document.querySelector('#salesChange'); sc.textContent=`${d.salesChange>0?'+':''}${d.salesChange}%`; sc.className=changeClass(d.salesChange);
 document.querySelector('#salesDetail').textContent=d.salesChangeDetail;
 const pc=document.querySelector('#popChange'); pc.textContent=`${d.populationChange>0?'+':''}${d.populationChange}%`; pc.className=changeClass(d.populationChange);
 document.querySelector('#popDetail').textContent=d.populationChangeDetail;
 document.querySelector('#description').textContent=d.description;
 document.querySelector('#overviewTitle').textContent=`${d.dong} 상권 개요 (${d.baseDate} 기준)`;
 document.querySelector('#industryBody').innerHTML=d.industries.map(r=>`<tr><td>${r.category}</td><td>${fmt(r.sales)}</td><td>${fmt(r.salesShare)}</td><td>${fmt(r.stores)}</td><td>${fmt(r.storeShare)}</td></tr>`).join('');
 document.querySelector('#charts').innerHTML=d.charts.map(c=>`<article class="chartCard"><h3>${c.title}</h3><img src="${c.src}" alt="${d.dong} ${c.title} 차트"></article>`).join('');
}
fetch('data.json').then(r=>{if(!r.ok)throw new Error('data.json을 불러오지 못했습니다.');return r.json()}).then(data=>{
 DATA=data; const sel=document.querySelector('#dongSelect'); sel.innerHTML=data.map((d,i)=>`<option value="${i}">${d.dong}</option>`).join('');
 sel.addEventListener('change',e=>render(data[Number(e.target.value)],Number(e.target.value))); render(data[0],0);
}).catch(err=>{document.querySelector('main').innerHTML=`<section class="panel"><h2>데이터 로딩 오류</h2><p>${err.message}</p><p>GitHub Pages 또는 로컬 웹서버에서 실행해 주세요.</p></section>`});