export default class Todolist {
  constructor() {
    this.collection = [];
    this.task = document.getElementById('item');
    this.item = document.getElementById('new-item');
    this.container = document.querySelector('.task');
    this.submit = document.getElementById('form');
    this.clear = document.querySelector('.clear');
    this.refresh = document.querySelector('.refresh');
    this.displayItems();
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('toggle')) {
        const index = e.target.dataset.id;
        this.checkItem(index);
      }
    });
    this.submit.addEventListener('submit', () => {
      this.addItem();
    });
    this.clear.addEventListener('click', () => {
      this.clearItem();
    });
    this.refresh.addEventListener('click', () => {
      this.refreshItems();
    });
  }

  addItem() {
    const item = this.item.value;
    const check = false;
    this.collection.push({ item, check });
    localStorage.setItem('collection', JSON.stringify(this.collection));
    this.displayItems();
    this.item.value = '';
  }

  displayItems() {
    this.container.innerHTML = '';
    this.collection.forEach((element, index) => {
      const node1 = document.createElement('div');
      node1.setAttribute('class', 'tasks');
      this.container.appendChild(node1);
      const box1 = document.createElement('div');
      const box2 =document.createElement('div');
      box1.setAttribute('class', 'box1');
      box2.setAttribute('class', 'box2');
      node1.appendChild(box1);
      node1.appendChild(box2);
      const checkbox = document.createElement('button');
      checkbox.setAttribute('class', 'toggle');
      checkbox.setAttribute('data-id', `${index}`);
      box1.appendChild(checkbox);
      const node2 = document.createElement('input');
      node2.setAttribute('class', 'text');
      node2.value = `${element.item}`
      box1.appendChild(node2);
      const drag = document.createElement('div');
      drag.setAttribute('class', 'dragable');
      const span1 = document.createElement('span');
      const span2 = document.createElement('span');
      const span3 = document.createElement('span');
      span1.setAttribute('class', 'drag-bar');
      span2.setAttribute('class', 'drag-bar');
      span3.setAttribute('class', 'drag-bar');
      drag.append(span1, span2, span3);
      box2.appendChild(drag);
      node2.addEventListener('change', () => {
        this.collection[index].item = node2.value;
        localStorage.setItem('collection', JSON.stringify(this.collection));
      })

    });
    
  }

  clearItem() {
    const newCollection = [];
    for (let i = 0; i < this.collection.length; i += 1) {
      if (this.collection[i].check === false) {
        newCollection.push(this.collection[i]);
      }
    }
    this.collection = newCollection;
    localStorage.setItem('collection', JSON.stringify(this.collection));
    this.displayItems();
  }

  checkItem(index) {
    const check = document.querySelectorAll('.toggle');
    check[index].classList.toggle('active');
    check[index].parentElement.children[1].classList.toggle('active');
    if (this.collection[index].check) {
      this.collection[index].check = false;
    } else {
      this.collection[index].check = true;
    }
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  refreshItems() {
    const newCollection = [];
    this.collection = newCollection;
    this.displayItems();
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }
}
