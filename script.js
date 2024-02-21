"use strict";

let ilanListesi = [];

//localStorage

if (localStorage.getItem("ilanListesi") !== null) {
    ilanListesi = JSON.parse(localStorage.getItem("ilanListesi"));
}


// İlan ekleme formundaki input alanları
const ilanResim = document.querySelector("#imgInput");
const ilanResim2 = document.querySelector("#imgInput2");
const ilanResim3 = document.querySelector("#imgInput3");
const ilanResim4 = document.querySelector("#imgInput4");
const ilanBaslik = document.querySelector("#baslikInput");
const ilanAciklama = document.querySelector("#aciklamaInput");
const ilanOda = document.querySelector("#odaInput");
const ilanBoyut = document.querySelector("#boyutInput");
const ilanFiyat = document.querySelector("#fiyatInput");
const ilanKonum = document.querySelector("#konumInput");


// Sayfa yüklendiğinde ilk olarak tüm ilanları göster
displayIlan("all");

// "Gönder" düğmesine tıklanınca yeni ilan ekleme işlevi
document.querySelector("#addNewIlan").addEventListener("click", function (event) {
    event.preventDefault(); // Formun varsayılan davranışını engelle


// Kategorilerin durumunu kontrol ederek ilgili ilanlara eklemek için dizi oluştur
    const secilenKategoriler = [];
    document.querySelectorAll(".filter input[type='checkbox']:checked").forEach(function (checkedCheckbox) {
        secilenKategoriler.push(checkedCheckbox.id);
    });

 // Girdi alanlarından ilan bilgilerini al
    const yeniIlan = {
        id: ilanListesi.length + 1,
        resimSrc: ilanResim.files.length > 0 ? URL.createObjectURL(ilanResim.files[0]) : null,
        resimSrc2: ilanResim2.files.length > 0 ? URL.createObjectURL(ilanResim2.files[0]) : null,
        resimSrc3: ilanResim3.files.length > 0 ? URL.createObjectURL(ilanResim3.files[0]) : null,
        resimSrc4: ilanResim4.files.length > 0 ? URL.createObjectURL(ilanResim4.files[0]) : null,
        baslik: ilanBaslik.value,
        aciklama: ilanAciklama.value,
        kategoriler: secilenKategoriler,
        oda: ilanOda.value,
        boyut: ilanBoyut.value,
        fiyat: ilanFiyat.value,
        konum: ilanKonum.value,
    };

    // Yeni ilanı ilan listesine ekle
    ilanListesi.push(yeniIlan);

    // localStorage'ı güncelle
    localStorage.setItem("ilanListesi", JSON.stringify(ilanListesi));

    // İlanları görüntüle
    displayIlan("all");

    // Form girdi alanlarını temizle
    ilanBaslik.value = "";
    ilanAciklama.value = "";
    ilanOda.value = "";
    ilanBoyut.value = "";
    ilanFiyat.value = "";
    ilanKonum.value = "";
    ilanResim.value = "";
    ilanResim2.value = "";
    ilanResim3.value = "";
    ilanResim4.value = "";
});

// İlanları görüntülemek için fonksiyon
function displayIlan(filter) {
    let ul = document.getElementById("ilan-list");
    ul.innerHTML = "";

    if (ilanListesi.length === 0) {
        ul.innerHTML = "<p style='text-align: center; font-size: 20px'>İlan Yok</p>";
    } else {
        for (let ilan of ilanListesi) {
            if (filter === "all" || ilan.kategoriler.includes(filter)) {
                let li = ` 
                    <li class="ilan" id="ilanID_${ilan.id}">
                        <div id="carouselExampleIndicators" class="carousel slide">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${ilan.id}" class="active"
                                aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${ilan.id + 1}"
                                aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${ilan.id + 2}"
                                aria-label="Slide 3"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${ilan.id + 3}"
                                aria-label="Slide 4"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="${ilan.resimSrc}" class="d-block w-100" id="ilanImg_${ilan.id}" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="${ilan.resimSrc2}" class="d-block w-100" id="ilanImg_${ilan.id + 1}" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="${ilan.resimSrc3}" class="d-block w-100" id="ilanImg_${ilan.id + 2}" alt="...">
                                </div>
                                <div class="carousel-item">
                                    <img src="${ilan.resimSrc4}" class="d-block w-100" id="ilanImg_${ilan.id + 3}" alt="...">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div class="card-body" id="card-body_${ilan.id}">
                            <h5 class="card-title" id="ilanBaslik_${ilan.id}">${ilan.baslik}</h5>
                            <p class="card-text" id="ilanAciklama_${ilan.id}">${ilan.aciklama}</p>
                        </div>
                        <ul class="list-group list-group-flush" id="ilan-detay_${ilan.id}">
                            <li class="list-group-item" id="ilanKonum_${ilan.id}">Konum: <span> ${ilan.konum}</span></li>
                            <li class="list-group-item" id="ilanOda_${ilan.id}">Oda Sayısı: <span>${ilan.oda}</span></li>
                            <li class="list-group-item" id="ilanBoyut_${ilan.id}">m2: <span> ${ilan.boyut}</span></li>
                            <li class="list-group-item" id="ilanFiyat${ilan.id}">Fiyat <span> ${ilan.fiyat}</span></li>
                        </ul>
                        <div class="card-body" id="link">
                            <a href="#" class="card-link" id="link-btn_${ilan.id}">İlana Git</a>
                        </div>
                    </li>
                `;
                ul.insertAdjacentHTML("beforeend", li);
            }
        }
    }
}

// Filtre butonlarına tıklama olayı
for (let span of document.querySelectorAll("#filters span")) {
    span.addEventListener("click", function () {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        const filter = span.id;
        displayIlan(filter);
        // Checkbox'ları temizle
        document.querySelectorAll(".filter input[type='checkbox']").forEach(function(checkbox) {
            checkbox.checked = false;
        });
    });
}


// Tüm ilanları silmek için fonksiyon
function tumIlanlariSil() {
    localStorage.removeItem("ilanListesi");
}

// Fonksiyonu çağırarak tüm ilanları sil


tumIlanlariSil();

displayIlan("all");