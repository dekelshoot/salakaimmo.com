import { Component, OnInit, ViewChild, AfterViewInit, Renderer2, EventEmitter, Input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ArraysService } from '../../services/arrays.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  // getting all required elements
  @ViewChild('searchInput') searchWrapper!: ElementRef<HTMLInputElement>;
  @ViewChild('input') inputBox!: ElementRef<HTMLInputElement>;
  @ViewChild('autocomBox') suggBox!: ElementRef<HTMLInputElement>;
  @ViewChild('icon') icon!: ElementRef<HTMLInputElement>;
  @ViewChild('a') linkTag!: ElementRef<HTMLInputElement>;
  @Input() search = "";

  suggestions = [""];

  listStyle = "list-style:none;padding: 8px 12px;width: 100%;cursor: default;border-radius: 3px;"
  iconStyle = "margin-right:10px;"
  // searchWrapper = document.querySelector(".search-input");

  webLink!: any;

  constructor(private renderer: Renderer2,
    private router: Router, private arraysService: ArraysService) { }

  ngOnInit() {
    this.suggestions = this.arraysService.search

  }

  ngAfterViewInit() {
    this.renderer.listen(this.inputBox.nativeElement, 'keyup', (e: any) => {
      let userData = e.target.value; //user enetered data
      let emptyArray = [];
      if (userData) {
        this.renderer.listen(this.icon.nativeElement, 'click', () => {
          this.routeSearch(userData)
        })
        this.renderer.listen(this.icon.nativeElement, 'submit', () => {
          this.routeSearch(userData)
          this.renderer.removeClass(this.searchWrapper.nativeElement, "active")
        })

        emptyArray = this.suggestions.filter((data: any) => {
          //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
          return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });

        emptyArray = emptyArray.map((data) => {
          // passing return data inside li tag
          return data = `<li  class="list" style="${this.listStyle}"><i style="${this.iconStyle}" class="bi bi-search"></i>${data}</li>`;
        });
        this.renderer.addClass(this.searchWrapper.nativeElement, "active") //show autocomplete box
        this.showSuggestions(emptyArray);
        let allList = this.suggBox.nativeElement.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
          this.renderer.listen(allList[i], "click", () => this.onSearch(allList[i]));
        }

      } else {
        console.log("noactive");
        this.renderer.removeClass(this.searchWrapper.nativeElement, "active");//hide autocomplete box
      }
    })
  }



  onSubmit() {
    this.renderer.removeClass(this.searchWrapper.nativeElement, "active")
    this.routeSearch(this.search)
  }
  onSearch(list: any) {
    let selectData = list.textContent;
    // this.renderer.setValue(this.inputBox.nativeElement, selectData != null ? selectData : "")
    this.search = selectData != null ? selectData : ""
    this.routeSearch(selectData != null ? selectData : "")
    this.renderer.removeClass(this.searchWrapper.nativeElement, "active")
  }
  routeSearch(search: string) {
    // this.router.navigate(['/article/recherche/' + search]);
    this.router.navigate(['/article/search'], { queryParams: { query: search } });
    console.log(search)

  }

  showSuggestions(list: any) {
    let listData;
    // if (!list.length) {
    //   let userValue = this.inputBox.nativeElement.value;
    //   listData = `<li>${userValue}</li>`;
    //   console.log(listData);
    // } else {
    //   listData = list.join('');
    // }
    let userValue = this.inputBox.nativeElement.value;
    // listData = `<li style="${this.listStyle}"><i style="${this.iconStyle}" class="bi bi-search"></i>${userValue}</li>`;
    list.unshift(listData);
    listData = list.join('');
    this.renderer.setProperty(this.suggBox.nativeElement, 'innerHTML', listData)
  }




  intitSearchBar() {

  }

}
