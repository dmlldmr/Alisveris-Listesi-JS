const text = document.getElementById("text"); //INPUT TEXTBOXUNA ULAŞ
const ekleb = document.getElementById("ekleb"); //Ekle butonuna ulaştık
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");//HIDDEN INPUT

let todoArray = [];

//ekle düğmesine tıklandıktan sonra
ekleb.addEventListener("click", (e) => {
    e.preventDefault(); //ilgili elementin tarayıcı tarafından o an yaptığı varsayılan işlemi engellemeye yarar
    let todo = localStorage.getItem("todo");//localStorage üzerinde kayıtlı olan anahtarları okumak için getItem metodu kullanılır. getItem metodu anahtar adını kendisine parametre olarak alıp geriye değeri döndürmektedir.
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo); //string verileri ayrıstırmak için ayrıstırdık diziye gonderdik
    }
    todoArray.push(text.value); //input boxun içine giren değeri diziye gonder
    text.value = "";  //input boxu bosalt
    localStorage.setItem("todo", JSON.stringify(todoArray));//nesneleri dizeye donusturmek için duzenle storageye gonder
    displayTodo();
   });


   function displayTodo() {
    let todo = localStorage.getItem("todo"); //localstoragedeki veriyi çek todoya ata
    if (todo === null) {
      todoArray = [];
    } else {
      todoArray = JSON.parse(todo); //string verileri ayrıstırmak için ayrıstırdık diziye gonderdik
    }
    let htmlCode = "";//ogeleri listeye ekleme islemi yapılıyor
    todoArray.forEach((list, ind) => {
      htmlCode += `<div class='flex mb-4 items-center'>
      <p class='w-full text-grey-darkest'>${list}</p>      
      <button onclick='deleteTodo(${ind})' class='flex-no-shrink 
      p-2 ml-2 border-2 rounded text-white bg-red-500'>Sil</button>
   </div>`;
    });
    listBox.innerHTML = htmlCode;
   }

   //sil ogesine tıklanırsa
   function deleteTodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1); //mevcut öğeleri silmek, yeni öğeler eklemek ve bir dizideki öğeleri değiştirmek için 
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
   }

   
