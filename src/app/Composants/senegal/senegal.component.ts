import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senegal',
  templateUrl: './senegal.component.html',
  styleUrls: ['./senegal.component.css']
})
export class SenegalComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
    this.exemple()
  }

  exemple(){
    var map = document.querySelector('#map')
    var paths = map?.querySelectorAll('.map_image a')
    var links = map?.querySelectorAll('.map_liste a')

    var activeArea = function(id:any){

        map?.querySelectorAll('.is-active').forEach( function(item){
          item.classList.remove('is-active')
      })
      if(id !== undefined)
      {
        document.getElementById('list-' + id)?.classList.add('is-active')
        document.getElementById('region-' + id)?.classList.add('is-active')
      }
    }

    paths?.forEach(function(path){
      path.addEventListener("mouseenter", function(e){
         var id = path.id.replace('region-', '')
         console.log('salut');
         activeArea(id)

      })
    })

    links?.forEach(function(link){
      link.addEventListener("mouseenter", function(e){
         console.log('salut');
         var id = link.id.replace('list-', '')
         activeArea(id)
      })
    })

    map?.addEventListener('mouseover', function(){
      activeArea(null)
    })

  }

}

