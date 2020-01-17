import AbstractComponent from './abstract-component';

export default class AbstractSmartComponent extends AbstractComponent {
  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);
  }
}
