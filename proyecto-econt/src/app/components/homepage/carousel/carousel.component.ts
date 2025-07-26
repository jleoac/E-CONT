import { Component, Input, OnInit } from '@angular/core';

/*Component: Decorador que define una clase como un componente de Angular (En TypeScript y Angular, un decorador es una 
función especial que añade metadatos a una clase, método, propiedad o parámetro. Se identifican con el símbolo @ antes del nombre.).
Input: Decorador que permite recibir datos desde un componente padre.
OnInit: Interfaz de ciclo de vida de Angular que ejecuta código al inicializar el componente.*/

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
  link: string;
}

/*Define la estructura de los objetos de imagen que el carrusel usará.
Cada imagen tiene:
imageSrc: La URL de la imagen.
imageAlt: El texto alternativo para accesibilidad.*/

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})

/*selector: 'app-carousel': Nombre que se usa para incluir el componente en otro HTML.
templateUrl: Ruta del archivo HTML con la estructura visual del componente.
styleUrls: Ruta del archivo CSS para los estilos del componente.*/

export class CarouselComponent implements OnInit {

/* Definición de la clase CarouselComponent
Define la clase del componente que manejará la lógica del carrusel.
Implementa OnInit para ejecutar código al iniciar el componente.*/

  @Input() images: carouselImage[] = []
  @Input() indicators = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 5000; //Default to 3 second

/*Propiedades con @Input()
@Input() images: Recibe una lista de imágenes para mostrar en el carrusel.
@Input() indicators: Activa o desactiva los indicadores (puntitos) del carrusel.
@Input() controls: Activa o desactiva los botones de navegación (previo y siguiente).
@Input() autoSlide: Si es true, el carrusel cambia automáticamente de imagen.
@Input() slideInterval: Tiempo en milisegundos entre cambios de imagen (por defecto, 5 segundos).
*/


  selectedIndex = 0;

/* Propiedad selectedIndex
Almacena el índice de la imagen actualmente mostrada.*/

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImages();
    }
  }

/*Método ngOnInit()
Se ejecuta al inicializar el componente.
Si autoSlide es true, llama a autoSlideImages() para cambiar de imagen automáticamente.*/

  //Changes slide in every 3 seconds
  autoSlideImages(): void {
    setInterval(() => {
      this.onNextClick();
    }, this.slideInterval);
  }

/*Método autoSlideImages()
Usa setInterval() para cambiar de imagen automáticamente cada slideInterval milisegundos.
Llama a onNextClick() para avanzar a la siguiente imagen.
*/

  // set index of image on dot/indicator click
  selectImage(index: number): void {
    this.selectedIndex = index;
  }

/*Método selectImage(index: number)
Cambia la imagen mostrada cuando se hace clic en un indicador (puntito).*/


  onPrevClick(): void {
    if(this.selectedIndex === 0) {
      this.selectedIndex = this.images.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick(): void {
    if(this.selectedIndex === this.images.length - 1) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }

/*Métodos de navegación (onPrevClick() y onNextClick()), botones derecha e izquierda
Mueve la imagen actual al anterior en la lista.
Si la imagen actual es la primera, va a la última.
Mueve la imagen actual a la siguiente en la lista.
Si está en la última imagen, vuelve a la primera.*/  

}
