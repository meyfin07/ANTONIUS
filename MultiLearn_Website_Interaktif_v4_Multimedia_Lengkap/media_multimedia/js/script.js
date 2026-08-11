const navLinks=document.querySelectorAll('.nav-link');
const sections=document.querySelectorAll('.page-section');
const navMenu=document.getElementById('navMenu');
const menuToggle=document.getElementById('menuToggle');

menuToggle.addEventListener('click',()=>navMenu.classList.toggle('open'));
navLinks.forEach(link=>link.addEventListener('click',()=>navMenu.classList.remove('open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      const id=entry.target.id;
      navLinks.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+id));
    }
  });
},{threshold:.18});
sections.forEach(s=>observer.observe(s));
document.querySelectorAll('.reveal').forEach(el=>{
  const ro=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.1});
  ro.observe(el);
});

const questions=[
 {q:'Apa yang dimaksud dengan multimedia?',o:['Penggunaan satu media saja','Gabungan beberapa media untuk menyampaikan informasi','Program untuk membuat game','Jaringan komputer'],a:1},
 {q:'Manakah yang termasuk unsur multimedia?',o:['Teks','Gambar','Audio dan video','Semua benar'],a:3},
 {q:'Media yang berupa suara disebut...',o:['Audio','Animasi','Grafik','Teks'],a:0},
 {q:'Video merupakan gabungan utama antara...',o:['Teks dan tabel','Visual bergerak dan audio','Kode dan database','Keyboard dan mouse'],a:1},
 {q:'Apa fungsi interaksi dalam multimedia?',o:['Membuat pengguna pasif','Membuat website lebih lambat','Memungkinkan pengguna berinteraksi dengan konten','Menghapus gambar'],a:2},
 {q:'Animasi digunakan untuk...',o:['Membuat gerakan visual','Menghapus audio','Menyimpan database','Mengganti keyboard'],a:0},
 {q:'Contoh media audio adalah...',o:['Foto','Musik','Poster','Ikon'],a:1},
 {q:'Salah satu kelebihan multimedia pembelajaran adalah...',o:['Lebih sulit dipahami','Informasi dapat disajikan lebih menarik','Tidak dapat menggunakan gambar','Tidak ada interaksi'],a:1},
 {q:'Elemen visual yang membantu menjelaskan informasi adalah...',o:['Gambar','Password','Database','Router'],a:0},
 {q:'Tombol, menu, dan kuis termasuk bentuk...',o:['Interaksi','Audio','Resolusi','Kompresi'],a:0}
];

const quizContainer=document.getElementById('quizContainer');
questions.forEach((x,i)=>{
  quizContainer.innerHTML+=`<div class="question"><h3>${i+1}. ${x.q}</h3>${x.o.map((op,j)=>`<label class="option"><input type="radio" name="q${i}" value="${j}"> ${op}</label>`).join('')}</div>`;
});

document.getElementById('submitQuiz').addEventListener('click',()=>{
  let score=0,answered=0;
  questions.forEach((x,i)=>{
    const chosen=document.querySelector(`input[name="q${i}"]:checked`);
    if(chosen){answered++;if(Number(chosen.value)===x.a)score++}
  });
  const result=document.getElementById('quizResult');
  if(answered<questions.length){result.classList.remove('hidden');result.innerHTML=`⚠️ Jawab semua soal terlebih dahulu. Baru dijawab <b>${answered}/${questions.length}</b>.`;return}
  const nilai=score*10;
  let msg=nilai>=80?'🔥 Mantap! Pemahamanmu sangat baik.':nilai>=60?'👍 Bagus! Tinggal sedikit lagi untuk hasil maksimal.':'💪 Jangan menyerah. Pelajari materi lagi dan coba ulangi.';
  result.classList.remove('hidden');result.innerHTML=`<b>Nilai: ${nilai}/100</b><br>${score} jawaban benar dari ${questions.length} soal.<br>${msg}`;
  result.scrollIntoView({behavior:'smooth',block:'center'});
});
document.getElementById('resetQuiz').addEventListener('click',()=>{
  document.querySelectorAll('input[type=radio]').forEach(x=>x.checked=false);
  document.getElementById('quizResult').classList.add('hidden');
});

document.getElementById('submitTask').addEventListener('click',()=>{
  const answers=[...document.querySelectorAll('textarea')];
  const msg=document.getElementById('taskMessage');
  if(answers.some(x=>!x.value.trim())){msg.classList.remove('hidden');msg.style.color='#fca5a5';msg.style.background='#ef444414';msg.textContent='⚠️ Lengkapi semua jawaban terlebih dahulu.';return}
  msg.classList.remove('hidden');msg.style.color='#86efac';msg.style.background='#22c55e16';msg.textContent='✅ Tugas berhasil dikirim secara lokal. Terima kasih!';
});

const topBtn=document.getElementById('topBtn');
window.addEventListener('scroll',()=>topBtn.style.display=window.scrollY>500?'block':'none');
topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
if (bgMusic && musicToggle) {
  musicToggle.addEventListener('click', async () => {
    try {
      if (bgMusic.paused) { await bgMusic.play(); musicToggle.textContent = '⏸'; }
      else { bgMusic.pause(); musicToggle.textContent = '▶'; }
    } catch (err) { alert('Klik tombol ▶ sekali lagi untuk memulai musik.'); }
  });
}
