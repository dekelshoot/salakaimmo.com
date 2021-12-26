import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArraysListService {

  lieu = ["","nsam","Bastos","Centre commercial","Elig-Edzoa","Djoungolo","Emana","Etoa-Meki","Mballa  ","Mfandena ","Ngoulemakong","Ngousso","Njon-essi","Nkolmesseng","Messassi","Nkolondom","Nlongkak ","Nylon ","Okolo","Olembe ","Tongolo","Manguier","Tsinga","Briqueterie","Madagascar","Nkomkana","Ntougou ","Mokolo quartier","Mokolo marché","Ekoudou","Febe","Oliga","Messa-Carrière","Azegue Messa Mezala","Messa Plateau","Angono","Doumassi","Ekoazon","Cité Verte","Etetack Abobo","Grand Messa","Messa Administratif","Ahala","Afanoya " ,"Centre administratif" ,"quartier du lac" ,"Dakar" ,"Efoulan" ,"Etoa" ,"Etoug-Ebe" ,"Mbaligi" ,"Méyo" ,"Mekoumbou" ,"Melen " ,"Messong" ,"Mvan" ,"Mvolyé" ,"Ngoa Ekélé","Nyomo","Nkol-Mbenda","Nkolmesseng","Nkolfon" ,"Nsimeyong" ,"Ntouessong" ,"Obili" ,"Obobogo" ,"Olezoa" ,"Simbock" ,"Mimboman " ,"Mvog Mbi" ,"Nkomo I" ,"Nkomo" ,"Ngoa Ekelé","Biteng" ,"Awae " ,"Ewonkan" ,"Nkolo" ,"Odza ","Mbog Abang","Ekoumdoum","Kondengui","Ekounou","Ekie","Ndamvout","Mvan","Nkolndongo ","Mimboman ","Nkolndongo","Mfoundassi","Messamme","Ndongo" ,"Toutouli" ,"Meyo" ,"Abome" ,"Minkan" ,"Mvog-Ada" ,"Ngousso" ,"Essos" ,"Mfandana" ,"Nkolmesseng" ,"Nkoul Mekong" ,"Quartier Fouda" ,"Eleveur" ,"Ngousso-Ntem","Biyem-Assi","Mendong ","Nkolbikok ","Etoug-Ebe","Melen","Mvog-Betsi","Etoug-Ebe ","Melen","Nkolbikok","Etetak","Nnom-Nnam","Oyom Abang ","Ngoulemakong","Oyom Abang","Ndamvouth","Oyom Abang","Nkomassi","Oyom Abang ","Nkolbisson","Nkol-So","Mbog-Doum","Abobo","Ebot-Mefou"];
  location= ["","Afa Noyoa","Ahala","Akoeman","Awae","Bankolo","Barière","Bastos","BEAC","Biteng","Biyem-Assi","Carrière","Centre ville","Cité verte","Dakar","Damas","Efoulan","Ekié","Ekoumdoum","Ekounou","Eleveur","Elig-Essono","Essomba","Essos","Etoa Meki","Etoudi","Etoug Ebe","Febe","Kondengui","Madagascar","Mbalgong","Mballa 2","Mbankolo","Melen","Mendong ","Messa","Messamendongo","Messassi","Mfou","Mimboman","Mokolo","Mont Febe","Monté Jouvence","Mvan","Mvog Ada","Mvog Atangana Mballa","Mvog Mbi","Mvolye","Ngoa Ekélé","Ngousso","Nkoabang","Nkol Eton","Nkolda","Nkolndongo","Nkomkana","Nkomo","Nkondengui","Nlongkak","Nsam","Nsimeyong","Nyom","Nyom1","Nyom2","Obili","Obobogo","Odza","Olembe","Olézoa","Omnisports","Oyom Abang","Poste centale","Quartier Fouda","Quartier Golf","Santa Barbara","Soa","Simbock","Tamtam","Titi garage","Tongolo","Tropicana","Tsinga","Village","Vogt","Yaoundé","Zamengoue" ]
  category = ["","Appartement à louer","Appartement à vendre","Appartement meublé", "Maison à louer", "Maison à vendre", 'Chambre à louer','Studio à louer','Studio meublé','Terrain','Boutique'];
  typeExchange = ["","A louer","A vendre"];
  prix = ["","0 - 50 000 F","50 000 - 150 000 F","150 000 - 300 000 F","300 000 - 500 000 F",">500 000 F"]
  chambre = ["","1 Chambre","2 chambres","3 chambres","4 chambres","5 ou plus"]
  search = ["","Appartement","Appartement à louer","joilie Appartement","studio","studio à louer","joilie studio",
  "chambre","chambre à louer","joilie chambre","maison","maison à louer","maison à vendre","somptieux Appartement",
  "joilie maison","terrain","terrain à vendre","boutique","boutique à louer","fond de commerce","duplex","duplex à louer","joilie duplex",
  "triplex","triplex à louer","joilie triplex",]

  constructor() { }
}
