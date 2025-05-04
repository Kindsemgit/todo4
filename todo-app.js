(function () {



  //создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2'); // создаем элемент appTitle и помещаем дом элемент в дом дерево с тегом h2
    appTitle.innerHTML = title; // присваиваем свойству innerHtml (т.е внутреннему содержимому этого тега) title который мы передаем в качестве аргумента
    return appTitle // возвращаем тот dom элемент который только что создали
  }

  //Создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form'); // создаем тег form
    let input = document.createElement('input'); // создаем тег input
    let buttonWrapper = document.createElement('div'); // создаем тег div
    let button = document.createElement('button'); // создаем тег button

    form.classList.add('input-group', 'mb-3'); // для form создаем два класса - butstrapp
    form.id = "form"
    input.classList.add('form-control'); // для input создаем класс form-control  - butstrapp правильно отобразит элемент формы
    input.id = 'input'
    input.placeholder = 'Введите название нового дела'; // добавляем пояснение в placeholder
    buttonWrapper.classList.add('input-group-append'); // класс butstrappp позиционирует элемент в форме справа от поля для ввода

    button.classList.add('btn', 'btn-primary'); // btn рисует кнопку, btn-primary - стилизует кнопку в butstrapp
    button.textContent = 'Добавить дело'; // добавляем текст в нутрь кнопки

    // объединяем наш дом дерево в единую структуру
    buttonWrapper.append(button); // в div вкладываем button
    form.append(input); // в form вкладываем input
    form.append(buttonWrapper); // в form вкладываем div c кнопкой

    /* ниже анологичный html код
  <form action="" class="input-group mb-3">
    <input class="form-control" placeholder="Введите название нового дела">
    <div class="input-group-append">
      <button class="btn btn-primary">
        Добавить дело
      </button>
    </div>
  </form>
    */

    return { // возвращаем результат
      form,
      input,
      button,
      // по нажатию на кнопку должны создать новый элемент в списке и забрать значение из input
    };
  }

  //Создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    list.id = 'list'

    return list;
  }

  //Создаем и возвращаем элемент в списке 
  function createTodoItem(name) {
    let item = document.createElement('li');
    // колонки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элементов списка, а также для размещения кнопок в его правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'aling-items-center');
    item.id = 'case';
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    //  вкладываем кнопки в отдельный элемент
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужен доступ к самому элементу и кнопкам, чтобы обработать события нажатия 
    return {
      item,
      doneButton,
      deleteButton,
    };

  };



  function createTodoApp(container, title = 'Список дел') {
    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle); // вернет сам дом элемент 
    container.append(todoItemForm.form); // возвращаем объект в котором помимо прочего есть form (возвращаем свойство form)
    container.append(todoList); // вернет сам дом элемент


    // браузер создает событие submint на форме по нажатию на enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function (e) {
      // эта строчка необходима тчобы предотвратить стандартное действие браузера
      // в данном случии мы не хотим чтобы страица перезагружалась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь не чего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      //добавляем обработчик на кнопки
      todoItem.doneButton.addEventListener('click', function () {
        todoItem.item.classList.toggle('list-group-item-success');
      });

      todoItem.deleteButton.addEventListener('click', function () {
        if (confirm('Вы уверены')) {
          todoItem.item.remove();
        }
      });

      // создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      // обнуляем значение в поле, чтобы не пришлось стирать его в ручную
      todoItemForm.input.value = '';
    });
  }




  window.createTodoApp = createTodoApp;

})();
function toLocal() {
  let List = document.querySelector('li')
  localStorage.setItem('todos', List.innerHTML);
}
toLocal()














// данный метод вернет входящие данные в виде строки
function dataToJson(data) {
  return JSON.stringify(data);
};

// данный метод вернет входящую строку в виде данных 
function jsonToData(data) {
  return JSON.parse(data);
};

// данный метод вернет данные из LocalStorage
function getCartData() {
  return localStorage.getItem('cartData');
};

// данный метод запишет наши данные в LocalStorage
function setCartData(data) {
  localStorage.setItem('cartData', data);
};




// метод addToCart будет получать в качестве параметра объекта товара 
// объект будет иметь два ключа id и name
function addToCart(product) {
  // первым шагом будем получать текущее состояние корзины
  let cart = getCartData();

  // вслучае если данные по ключу в LocalStorage нет, то cart будет содержать null
  // если cart имеет null, записываем туда пустой массив
  cart = cart ? jsonToData(cart) : [];
  // добавим продукт в список корзины и запишем в LocalStorage
  cart.push(product);
  setCartData(dataToJson(cart));
}

// addToCart({id:1,name:'Хлеб'})
// addToCart({id:2,name:'Сметана'})
