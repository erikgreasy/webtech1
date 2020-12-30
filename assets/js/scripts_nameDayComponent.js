class calendar extends HTMLElement {
  connectedCallback() {
      this.innerHTML = `
      <div class="panel panel-default id="mypanel"  >
          <div class="panel-heading" >
              <h5 >Kalendár mien </h5>
              <label class="checkbox-inline">
                  <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked onchange="toggleSearch()" >
                  <label class="form-check-label" for="inlineRadio1"> Podľa mena </label>
                  </div>
              </label>
              <label class="checkbox-inline">
                  <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"  onchange="toggleSearch()" >
                  <label class="form-check-label" for="inlineRadio2"> Podľa dátumu </label>
                  </div>
              </label>
          </div>
          <div class="panel-body">
              <div class="input-group">
                  <input type="text" class="form-control" placeholder="Meno" id="name" oninput="findByName()" />
                  <span class="input-group-addon">-</span>
                  <input type="number" class="form-control" placeholder="Deň"  min="1" max="31" id="day" oninput="findByDate()" disabled />
                  <span class="input-group-addon">-</span>
                  <input type="number" class="form-control" placeholder="Mesiac"   min="1" max="12" id="month" oninput="findByDate()" disabled />
              </div>
              <br>
              <p  id="intro" >  Vyhľadaj meniny  <b id="nameDay" > v našom kalendári  </b> </p>
          </div>
      </div>
      `;
  }

}

if (!customElements.get('cale-ndar')) {
  customElements.define('cale-ndar', calendar);
}

function toggleSearch(){
    let checkbox1 = document.getElementById('inlineRadio1');
    let inputName = document.getElementById('name');
    let inputDay = document.getElementById('day');
    let inputMonth = document.getElementById('month');

    if(checkbox1.checked) {
        inputDay.disabled = !inputDay.disabled;
        inputMonth.disabled = !inputMonth.disabled;
        inputName.disabled = !inputName.disabled;

    } else {
        inputDay.disabled = !inputDay.disabled;
        inputMonth.disabled = !inputMonth.disabled;
        inputName.disabled = !inputName.disabled;
    }
}

var xmlFile = 'http://147.175.121.202/~xbutorar/skuuuska_68249/assets/meniny.xml';
var xmlDoc; var skName; var skSviatok;

function loadDoc() {
  var xhttp = new XMLHttpRequest();

  xhttp.open("GET", xmlFile, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      xmlFunction(this);
    }
  };
}

function xmlFunction(xml) {
  xmlDoc = xml.responseXML;
  days = xmlDoc.getElementsByTagName("den");
}

loadDoc();

$( "#showCalendar" ).click(function() {
  $( ".panel-default" ).toggle(); ;
});

function findByDate(){
      var monthVal = document.getElementById("month").value;
      var dayVal = document.getElementById("day").value;
      checkDate(monthVal,dayVal);
      if(monthVal === "" || dayVal === "" ) {
        return 0 ;
      }
            
        var month = "";
        if (monthVal < 10) {
          month = String("0" + monthVal);
        } else {
          month = String(monthVal);
        }

        var day = "";
        if (dayVal < 10) {
          day = String("0" + dayVal);
        } else {
          day = String(dayVal);
        }
  
        let search = month + day;
        for (let a = 0; a < 366; a++) {
            if (days[a].textContent === search) {
                var date = xmlDoc.childNodes[2].children[a].children;
                printNames(date);
            }
        }
}

function printNames( date) {
  skName = "";
  skSviatok = "";
    for (let i=0; i < date.length; i++) {
        if(date[i].tagName === "SKd") {
            skName = date[i].innerHTML;
        }
        if(date[i].tagName === "SKsviatky") {
          skSviatok = date[i].innerHTML;
      }
    }
    var print = "";
    if(skName !== "") {
      print = skName;
    } else {
      print = "nikto ";
    }
    if(skSviatok !== "") {
      print = print + " a je " + skSviatok;
    } 

    var element = document.getElementById("intro");
    element.innerHTML = "Dnes má meniny <b id=\"nameDay\" > "  + print + " </b>";

}

function findByName(){
  var searchedEl = document.getElementById("name");
    let sname = String(searchedEl.value);
    var searchedName = String(searchedEl.value).toUpperCase();
    var search = xmlDoc.childNodes[2].children;
    for (let i = 0; i < 366; i++){
        var elements = search[i].children;
        let ii;
        let current = 0;
        let namePrint;
        for(ii = 0; ii< 5; ii++) {
            if (elements[ii].tagName == "SKd") {
              current = elements[ii].innerHTML;
              current = String(_.deburr(current)).toUpperCase();
              namePrint = String(elements[ii].innerHTML);
              break;
            }
            /*if (elements[ii].tagName == "SKsviatky") {
              
            }*/
        }
        if (searchedName !== "" && current!==0 ) {
          let deburredSearch = _.deburr(searchedName);
          let splitNames = current.split(", ");
          for (c = 0; c < splitNames.length; c++ ) {
              if(splitNames[c] ===deburredSearch ) {
                let splitOriginal = namePrint.split(", ");
                printDate(search[i].children[0].innerHTML , splitOriginal[c]);
              }
          }
          
        }
    }
}

function printDate( nameToDate , searched ) {
  var element = document.getElementById("intro");
  element.innerHTML = searched + " má meniny <b id=\"nameDay\" > "  +  (nameToDate[2] === "0" ? " " : nameToDate[2])  + nameToDate[3] + "." + ( nameToDate[0] === "0" ? " " : nameToDate[0])  + nameToDate[1] + "." + " </b>";
}

function checkDate(m , d){
  if ( Number(d) > 31 ) {
    d = 31;
  }

  if ( Number(d) < 1 &&  d !== "") {
    d = 1;
  }

  if ( Number(m) > 12 ) {
    m = 12;
  }

  if ( Number(m) < 1 && m !== "" ) {
    m = 1;
  }

  if( m!== "") {
    if (   ( Number(m) === 4  || Number(m) === 6  || Number(m) === 9  || Number(m) === 11  ) && Number(d) > 30   ) {
          d = 30;
      }
  }
  
  if ( Number(m) === 2 && Number(d) > 29 ) {
    d = 29;
  }

  var dayInput = document.getElementById("day");
  dayInput.value = d;
  var monthInput = document.getElementById("month");
  monthInput.value = m;
}