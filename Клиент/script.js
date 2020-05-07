let elem1;
let masID = [];
let masTEXT = [];

    class Person {
        constructor(lastname, firstname, surname, address, clNum, olymp){
            this.lastname = lastname;
            this.surname = surname;
            this.firstname = firstname;
            this.address = address;
            this.clNum = clNum;
            this.olymp = olymp;
        }       

        GetArgument() {
            return [this.lastname,this.firstname,this.surname,this.address,this.clNum,this.olymp];
        } 
    }

    function AddField() {
        var a = document.querySelector("#listId");
        var b = document.querySelector("#ntf");
        var name = document.getElementById("name_ntf").value;

        var person = new Person(GetLastName(),GetFirstName(),GetSurname(),GetAddres(),GetClNum(),GetOlymp());
        person[name] = b.value;

        var result = "";
        for (var key in person) {
            if(key == '')
                continue;
            result += key + " значение: " + person[key] + '\n';
        }

        alert(result);

       document.getElementById("ntf").value = null;
       document.getElementById("name_ntf").value = null;
       ClearForm();
    }


    
   



    function GetConnection(){
        var db = openDatabase("MyDb", "0.1", "List person", 200000);
        
        db.transaction(function (tx) {   
           tx.executeSql('CREATE TABLE IF NOT EXISTS Persons (id INTEGER PRIMARY KEY,lastname, firstname, surname, address, clNum, olymp)'); 
        });

        return db;
    }

    function AddPerson() {
        if(!CheckValid())
            return;

        let class_ = document.getElementById("clnmber").value;


        var db = GetConnection();        
        var person = new Person(GetLastName(),GetFirstName(),GetSurname(),GetAddres(),GetClNum(),GetOlymp());

        db.transaction(function(tx) {
            tx.executeSql("INSERT INTO Persons (lastname, firstname, surname, address, clNum, olymp) values(?, ?, ?, ?, ?, ?)", person.GetArgument());
            LoadListId();
            RefreshTableDate();
        });

        document.getElementById("lastname").value = null;
        document.getElementById("firstname").value = null;
        document.getElementById("surname").value = null;
        document.getElementById("address").value = null;
        document.getElementById("clnmber").value = null;
        document.getElementById("olymp").checked = false;
    }

    function ClearForm() {
        document.getElementById("lastname").value = null;
        document.getElementById("firstname").value = null;
        document.getElementById("surname").value = null;
        document.getElementById("address").value = null;
        document.getElementById("clnmber").value = null;
        document.getElementById("olymp").checked = false;
    }

    function ShowTable() {

    

        var controller = document.querySelector("#controlTable");
        var container =  document.querySelector("#containder__table");
        var table = document.querySelector("#tablePersons");
        
        if(controller.value == "Скрыть"){
            controller.value = "Показать"
            container.style.display = "none";
            return;
        }
        else {
            controller.value = "Скрыть";
            container.style.display = "block";
            RefreshTableDate();
        }
    }

    function CheckValid() {
        if(document.querySelector('#content_form').checkValidity()){
            return true;
        }
        else {
            alert('Проверьте введённые данные');
            return false;
        }
    }





const printAddedValueInTable = (result) => {
    
   
    return resultString;
};

let leg=0;
let mas=0;
    function RefreshTableDate() {
let resultString = '';
let resultMas = [];
        var table = document.querySelector("#tablePersons");
        table.innerHTML = '';
        var db = GetConnection();
        db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM Persons", [], function(tx, result) {
                        for(var i = 0; i < result.rows.length; i++) {
                            var tr = '<tr>';
                            tr += '<td>' + result.rows.item(i)['lastname'] + ' ' + result.rows.item(i)['firstname'] + ' ' + result.rows.item(i)['surname']  +'</td>';
                            tr += '<td>' + result.rows.item(i)['address'] + '</td>';
                            tr += '<td>' + result.rows.item(i)['clNum'] + '</td>';            
            
                            if(result.rows.item(i)['olymp'] == "true"){
                                tr += '<td>' + 'Да' + '</td>';
                            }
                            else {
                                tr += '<td>' + 'Нет' + '</td>';
                            }
                           
                            if(masID.length>0){
                                 console.log("проверка длины"+masID.length);
                            while(leg<masID.length){
                             console.log("проверка элементов"+ masID[leg]);
                              if(result.rows.item(i)['lastname']===masID[leg]){ console.log("ravno");    tr+='<td>' + masTEXT[leg] + '</td>'; }
                                leg++;
                                
                            }
                        }
                            leg=0;
                         table.innerHTML += tr;
                        }
                    },null)
            });
    }

    function RefreshTableDatePlus() {
        let resultString = '';
        var table = document.querySelector("#tablePersons");
        table.innerHTML = '';
        var db = GetConnection();
        db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM Persons WHERE olymp = 'true'", [], function(tx, result) {
                        for(var i = 0; i < result.rows.length; i++) {
                            var tr = '<tr>';
                            tr += '<td>' + result.rows.item(i)['lastname'] + ' ' + result.rows.item(i)['firstname'] + ' ' + result.rows.item(i)['surname']  +'</td>';
                            tr += '<td>' + result.rows.item(i)['address'] + '</td>';
                            tr += '<td>' + result.rows.item(i)['clNum'] + '</td>';            
            
                            if(result.rows.item(i)['olymp'] == "true"){
                                tr += '<td>' + 'Да' + '</td>';
                            }
                            else {
                                tr += '<td>' + 'Нет' + '</td>';
                            }
                           //console.log(result.rows.item(i)['lastname']);  
                           console.log("проверка"+masID.length);

                             if(result.rows.item(i)['lastname']===masID[i]){
                            
                           resultString= '<td>' + masTEXT[i] + '</td>'
                            }// else { resultString = '<td>' + "Null" + '</td>'}

                            tr += '</td>'+resultString;
                            
                            table.innerHTML += tr;
                        }
                    },null)
            });
    }

const addNewInput = () => {
    let addNewInput = document.getElementById('addNewInput');
    if (addNewInput.style.display === 'block') {
        addNewInput.style.display = 'none';
        addNewInput.innerHTML = "";
    } else {
        addNewInput.style.display = 'block';
    }
};
let pz=0;
const addMeanNewInput = ()=>{
let table= document.getElementById("fasad_table");
 let i=table.rows[0].cells.length;

var elem=document.createElement("label");
      masTEXT[pz]=document.getElementById("ntf").value;
     console.log( masID.length);
   masID[pz]=document.getElementById("ntf2").value;
                            pz++;
}

const createNewInput = () => {
let table= document.getElementById("fasad_table");
let i=table.rows[0].cells.length;

   var cell;
var row;
        row=table.rows.item(table.rows[0].cells.length-i);
    cell = row.insertCell(table.rows[0].cells.length)
    cell.innerHTML = document.getElementById("name_ntf").value;


};




const RefreshTableDateNX = () => {
    let maxMinTable = document.getElementById('maxMinTable');
    if (maxMinTable.style.display === 'block') {
        maxMinTable.style.display = 'none';
        maxMinTable.innerHTML = "";
    } else {
        maxMinTable.style.display = 'block';
        printMaxMinTable(maxMinTable);
    }
};

   const printMaxMinTable = (maxMinTable) => {
    let titleRow = document.createElement('tr');
    titleRow.innerHTML =
               "<td>" + "Минимальное время "+   "</td>" +
        "<td>" + " Максимальное время" + "</td>";
    maxMinTable.appendChild(titleRow);
    let minIndex = 0;
    let maxIndex = 0;
let row = document.createElement('tr');
   //var table = document.querySelector("#tablePersons");
 //     table.innerHTML = '';
        var db = GetConnection();
        db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM Persons", [], function(tx, result) {
                      let min = result.rows.item(i)['clNum'];
                    let max =result.rows.item(i)['clNum'];
                        for(var i = 0; i < result.rows.length; i++) {
                      
                            result.rows.item(i)['clNum'];


                             if(result.rows.item(i)['clNum'] > max) {
                max = result.rows.item(i)['clNum'];
                  maxIndex = i;
                  alert(max);
            }
            if(result.rows.item(i)['clNum'] < min) {
                min = result.rows.item(i)['clNum'];
                minIndex = i;
                 alert(min);
            }
             row.innerHTML =
        "<td>" +min + "</td>" +
        "<td>" + max + "</td>";
        maxMinTable.appendChild(row);
                        }
                    },null)

             
            
    
            });
 
};



    function LoadListId() {
        var db = GetConnection();        
        var list = GetListId();
        db.transaction(function(tx) {
                tx.executeSql("SELECT id FROM Persons", [], function(tx, result) {                        
                        list.innerHTML = "";                        
                        for(var i = 0; i < result.rows.length; i++) {                           
                            list.innerHTML += '<option>' + result.rows.item(i)['id'] + '</option>';
                        }
                    },null)
            });
    }

    function DeletePerson() {
        var db = GetConnection();
        var list = GetListId();

        if(list.selectedIndex == -1)
            return;

        var id = list.options[list.selectedIndex].text;

        db.transaction(function(tx) {
            tx.executeSql("DELETE FROM Persons WHERE id = ?", [id], null,null);
            LoadListId();
            RefreshTableDate();
        });
    }   

    function Temp() {
        var db = openDatabase("MyDb", "0.1", "List person", 200000);
        
        db.transaction(function (tx) {   
           tx.executeSql('DROP TABLE Persons'); 
        });
    }

    function GetLastName(){
        return document.querySelector("#lastname").value;
    }

    function GetFirstName() {
        return document.querySelector("#firstname").value;
    }

    function GetSurname() {
        return document.querySelector("#surname").value;
    }

    function GetAddres() {
        return document.querySelector("#address").value;
    }

    function GetClNum() {
        return document.querySelector("#clnmber").value;
    }

    function GetOlymp() {
        return document.querySelector("#olymp").checked;
    }

    function GetListId() {
        return document.querySelector("#listId");
    }






