import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArraysService {
  popularWords = ["Maison à vendre", "Maison à louer", "Terrain", "Appartement à louer", "Appartement à vendre", "Appartement meublé", "Chambre à louer", 'Studio à louer', 'Studio meublé', 'Boutique', 'Fond de commerce', "Usine", "Entrepot", "Magasin", 'Autre']
  lieu = ["", "nsam", "Bastos", "Centre commercial", "Elig-Edzoa", "Djoungolo", "Emana", "Etoa-Meki", "Mballa  ", "Mfandena ", "Ngoulemakong", "Ngousso", "Njon-essi", "Nkolmesseng", "Messassi", "Nkolondom", "Nlongkak ", "Nylon ", "Okolo", "Olembe ", "Tongolo", "Manguier", "Tsinga", "Briqueterie", "Madagascar", "Nkomkana", "Ntougou ", "Mokolo quartier", "Mokolo marché", "Ekoudou", "Febe", "Oliga", "Messa-Carrière", "Azegue Messa Mezala", "Messa Plateau", "Angono", "Doumassi", "Ekoazon", "Cité Verte", "Etetack Abobo", "Grand Messa", "Messa Administratif", "Ahala", "Afanoya ", "Centre administratif", "quartier du lac", "Dakar", "Efoulan", "Etoa", "Etoug-Ebe", "Mbaligi", "Méyo", "Mekoumbou", "Melen ", "Messong", "Mvan", "Mvolyé", "Ngoa Ekélé", "Nyomo", "Nkol-Mbenda", "Nkolmesseng", "Nkolfon", "Nsimeyong", "Ntouessong", "Obili", "Obobogo", "Olezoa", "Simbock", "Mimboman ", "Mvog Mbi", "Nkomo I", "Nkomo", "Ngoa Ekelé", "Biteng", "Awae ", "Ewonkan", "Nkolo", "Odza ", "Mbog Abang", "Ekoumdoum", "Kondengui", "Ekounou", "Ekie", "Ndamvout", "Mvan", "Nkolndongo ", "Mimboman ", "Nkolndongo", "Mfoundassi", "Messamme", "Ndongo", "Toutouli", "Meyo", "Abome", "Minkan", "Mvog-Ada", "Ngousso", "Essos", "Mfandana", "Nkolmesseng", "Nkoul Mekong", "Quartier Fouda", "Eleveur", "Ngousso-Ntem", "Biyem-Assi", "Mendong ", "Nkolbikok ", "Etoug-Ebe", "Melen", "Mvog-Betsi", "Etoug-Ebe ", "Melen", "Nkolbikok", "Etetak", "Nnom-Nnam", "Oyom Abang ", "Ngoulemakong", "Oyom Abang", "Ndamvouth", "Oyom Abang", "Nkomassi", "Oyom Abang ", "Nkolbisson", "Nkol-So", "Mbog-Doum", "Abobo", "Ebot-Mefou"];
  location = ["", "Afa Noyoa", "Ahala", "Akoeman", "Awae", "Bankolo", "Barière", "Bastos", "BEAC", "Biteng", "Biyem-Assi", "Carrière", "Centre ville", "Cité verte", "Dakar", "Damas", "Efoulan", "Ekié", "Ekoumdoum", "Ekounou", "Eleveur", "Elig-Essono", "Essomba", "Essos", "Etoa Meki", "Etoudi", "Etoug Ebe", "Febe", "Kondengui", "Madagascar", "Mbalgong", "Mballa 2", "Mbankolo", "Melen", "Mendong ", "Messa", "Messamendongo", "Messassi", "Mfou", "Mimboman", "Mokolo", "Mont Febe", "Monté Jouvence", "Mvan", "Mvog Ada", "Mvog Atangana Mballa", "Mvog Mbi", "Mvolye", "Ngoa Ekélé", "Ngousso", "Nkoabang", "Nkol Eton", "Nkolda", "Nkolndongo", "Nkomkana", "Nkomo", "Nkondengui", "Nlongkak", "Nsam", "Nsimeyong", "Nyom", "Nyom1", "Nyom2", "Obili", "Obobogo", "Odza", "Olembe", "Olézoa", "Omnisports", "Oyom Abang", "Poste centale", "Quartier Fouda", "Quartier Golf", "Santa Barbara", "Soa", "Simbock", "Tamtam", "Titi garage", "Tongolo", "Tropicana", "Tsinga", "Village", "Vogt", "Yaoundé", "Zamengoue"]
  category = ["", "Appartement à louer", "Appartement à vendre", "Appartement meublé", "Maison à louer", "Maison à vendre", "Maison meublé", 'Chambre à louer', 'Chambre meublé', 'Studio à louer', 'Studio meublé', 'Terrain', 'Boutique', 'Fond de commerce', "Usine", "Entrepot", "Magasin", 'Autre'];
  category2 = ["Appartement à louer", "Appartement à vendre", "Appartement meublé", "Maison à louer", "Maison à vendre", "Maison meublé", 'Chambre à louer', 'Chambre meublé', 'Studio à louer', 'Studio meublé', 'Terrain', 'Boutique', 'Fond de commerce', "Usine", "Entrepot", "Magasin", 'Autre'];
  subTitle = ["Retrouver des appartements de haut standing", "Faites le meilleur choix avec nos appartements ", "Du meublé de haut qualité pour votre confort", "Des duplex de haut standing", "La meilleure affaire en termes d'achat", "Du meublé de premier choix pour des personnes de premier choix", 'Beau meublé pour passer du bon temps', 'Beau meublé pour passer du bon temps', 'Studio de haut standing ', 'Beau meublé pour passer du bon temps', 'Un terrain dans un espace sécurisé', 'Des boutiques dans des zones à très grand trafique', 'Un bon fonds de commerce pour débuter une nouvelle affaire', "Usine", "Entrepot", "Magasin", 'Autre'];
  icons = ["bi-building", "bi-building", "bi-building", "bi-house-door", "bi-house-door", "bi-house-door", "bi-door-closed", "bi-door-closed", "bi-door-open", "bi-door-open", "bi-signpost", "bi-shop", "bi-shop", "bi-shop-window", "bi-shop-window", "bi-shop-window", "bi-building"]
  color = ["#e13300", "#1e3264", "#e8115b", "#d84000", "#006450", "#148a08", "#503750", "#8c1932", "#006450", "#8d67ab", "#e1118c", "#e91429", "#777777", "#d84000", "#006450", "#e61e32", "#438270", "#8c1932"]
  colorRgb = ["RGBA(0,100,80,1)", "RGBA(30,50,100,1)", "RGBA(232,17,91,1)", "RGBA(216,64,0,1)", "RGBA(0,100,80,1)", "RGBA(20,138,8,1)", "RGBA(80,55,80,1)", "RGBA(140,25,50,1)", "RGBA(0,100,80,1)", "RGBA(141,103,171,1)", "RGBA(225,17,140,1)", "RGBA(233,20,41,1)", "RGBA(119,119,119,1)", "RGBA(216,64,0,1)", "RGBA(0,100,80,1)", "RGBA(230,30,50,1)", "RGBA(67,130,112,1)", "RGBA(140,25,50,1)"]
  colorRgb2=["rgb(92, 10, 1)","rgb(1, 68, 92)","rgb(47, 92, 1)","rgb(165, 2, 78)","rgb(39, 1, 92)","rgb(5, 177, 120)","rgb(138, 68, 43)","rgb(23, 5, 187)","rgb(92, 78, 1)","rgb(162, 19, 155)"]
  typeExchange = ["", "A louer", "A vendre"];
  prix = ["", "0 - 50 000 F", "50 000 - 150 000 F", "150 000 - 300 000 F", "300 000 - 500 000 F", ">500 000 F"]
  chambre = ["", "1 Chambre", "2 chambres", "3 chambres", "4 chambres", "5 ou plus"]
  search = ["", "Appartement", "Appartement à louer", "joilie Appartement", "studio", "studio à louer", "joilie studio",
    "chambre", "chambre à louer", "joilie chambre", "maison", "maison à louer", "maison à vendre", "somptieux Appartement",
    "joilie maison", "terrain", "terrain à vendre", "boutique", "boutique à louer", "fond de commerce", "duplex", "duplex à louer", "joilie duplex",
    "triplex", "triplex à louer", "joilie triplex",];
  choixEquipe = ["", "oui", "non"]
  date = ["","plus récent", "moins récent"]
  articles = [
    {
      "accessibilite": "Proche",
      "categorie": "Appartement à louer",
      "datePublication": "Sun Sep 04 2022 03:32:33 GMT+0100 (heure normale d’Afrique de l’Ouest)",
      "dealerEmail": "etablissementsalaka@gmail.com",
      "description": "Appartements de 2 chambres, 2 douches, â côté du goudron à 150.000F et 130.000F à biyem assi acacia\nNouvellement construit\nOn verse 1 an d'avance.",
      "detailPiece": "Normale",
      "eauElectricite": "Oui",
      "id": "7ccdcae9885a48eb9793d0982e6b41e6",
      "lieu": "Biyem-Assi",
      "modalite": "150000",
      "nombreChambre": 2,
      "nombrePhoto": 8,
      "nombrePiece": 9,
      "nombreVu": 8,
      "parking": "Oui",
      "photo": [
        "../../assets/img/1.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 150000,
      "securite": "Oui",
      "titre": "Appartements de 2 chambres, 2 douches, â côté du goudron à 150.000F et 130.000F à biyem assi acacia Nouvellement construit On verse 1 an d'avance.",
      "typeEchange": "A louer",
      "superficie":400
    },
    {
      "accessibilite": "",
      "categorie": "Appartement à louer",
      "datePublication": "Fri Sep 02 2022 06:45:46 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "juniortchoupe5@gmail.com",
      "description": "Situé à Mballa 2 avec prévision de clim et chauffe eau,  gardien en permanence.\n *Un très beau appartement de 3 chambres à 280.000F* \n, 3 douches, le salon est comme une salle de fête,  la cuisine avec magasin pour la machine à laver.\nAu Ray de chaussé avec espace avant/arrière.\nParking et eau en permanence.\nOn verse 280.000F * 8 ( 6 mois de loyer + 2 mois de caution)\nProche du goudron",
      "detailPiece": "3 chambres 3 douches 1 salon 1salle de fête 1 cuisine 1 magasin ",
      "eauElectricite": "Oui ",
      "id": "9d05dba7bef140afa86058070fde9bc9",
      "lieu": "Mballa 2",
      "modalite": "280.000F * 8 ( 6 mois de loyer + 2 mois de caution)",
      "nombreChambre": 3,
      "nombrePhoto": 7,
      "nombrePiece": 10,
      "nombreVu": 9,
      "parking": "Oui ",
      "photo": [
        "../../assets/img/2.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 280000,
      "securite": "Gardien ",
      "titre": "Apparemment à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "",
      "categorie": "Appartement à louer",
      "datePublication": "Fri Sep 02 2022 06:35:14 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "juniortchoupe5@gmail.com",
      "description": "Appartement à louer situé à ODZA  bien propre avec 1 vaste salle 1 espace salle à manger 1 grande cuisine 2 balcons 2 et 3 chambres 2 douches avec forage et 1 grand parking\nBonne proximité \nPrix : 130 mille et 160-170 mille",
      "detailPiece": "1 vaste salle 1 espace salle à manger 1 grande cuisine 2 balcons 2 et 3 chambres 2 douches ",
      "eauElectricite": "Forage ",
      "id": "fde139fc39d74722971ec6b9cefe83e6",
      "lieu": "Odza",
      "modalite": "130 mille et 160-170 mille",
      "nombreChambre": 3,
      "nombrePhoto": 8,
      "nombrePiece": 11,
      "nombreVu": 3,
      "parking": "Oui",
      "photo": [
        "../../assets/img/3.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 130000,
      "securite": "Barrière ",
      "titre": "Appartement à louer situé à ODZA  bien propre",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Tue Jul 26 2022 10:57:26 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Studio doublement chic à louer à la cité verte très proche de l'axe principal\nNb: c'est le nouvellement construit à seulement 75000fr/1an😎",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche ",
      "eauElectricite": "Oui",
      "id": "11e8869c9fef4f16ad5a8080d392f1a4",
      "lieu": "Cité verte",
      "modalite": "75000*12mois",
      "nombrePhoto": 6,
      "nombreVu": 15,
      "parking": "Oui",
      "photo": [
        "../../assets/img/4.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 75000,
      "securite": "Oui",
      "titre": "Studio à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Tue Jul 26 2022 10:51:05 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Nombre d'occupants 2 maxi le studio c'est 80.000fr /1an pas négociable la voiture te laisse tu entre 😎",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche ",
      "eauElectricite": "Oui",
      "id": "3a2a235a35dc4b02b26b4796a759ccf9",
      "lieu": "Cité verte",
      "modalite": "80000*12mois",
      "nombrePhoto": 8,
      "nombreVu": 10,
      "parking": "Oui",
      "photo": [
        "../../assets/img/5.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 80000,
      "securite": "Oui",
      "titre": "Studio à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Tue Jul 26 2022 10:49:15 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "joli studio moderne situé à jouvence composé de chambre cuisine douche prix 50.000x6+2",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche ",
      "eauElectricite": "Oui",
      "id": "ab4626db2c9b45a8a0d3dfedaf988bad",
      "lieu": "Monté Jouvence",
      "modalite": "50000*6+2",
      "nombrePhoto": 7,
      "nombreVu": 15,
      "parking": "Oui",
      "photo": [
        "../../assets/img/6.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 50000,
      "securite": "Oui",
      "titre": "Studio a louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Mon Jul 25 2022 12:53:58 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Studio bien propre de 70.000F autour de ngoa ékélé avec 2 toilettes , à côté de la route",
      "detailPiece": " 1 chambre 2 douches 1 salon 1 cuisine ",
      "eauElectricite": "Oui",
      "id": "a3995f1c26a74b4fa00d21c3ff6532a0",
      "lieu": "Ngoa Ekélé",
      "modalite": "70000 le mois ",
      "nombrePhoto": 6,
      "nombreVu": 18,
      "parking": "Oui",
      "photo": [
        "../../assets/img/7.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 70000,
      "securite": "Oui",
      "titre": "Studio à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Wed Jul 20 2022 12:00:23 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Voici les studios nouvellement construit au carrefour Meec très proche de l'axe principal 60 mil 6 mois+ 1 mois de caution 🏃 🏃🏃",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche ",
      "eauElectricite": "Oui",
      "id": "746c424372af404f87d684284b01750d",
      "lieu": "Carrefour Meec",
      "modalite": "60000*6+1",
      "nombrePhoto": 5,
      "nombreVu": 5,
      "parking": "Oui",
      "photo": [
        "../../assets/img/8.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 60000,
      "securite": "Oui",
      "titre": "Appartement a louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Tue Jul 19 2022 14:33:55 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Joli studio très confortable situé à symbock  composé de chambre cuisine douche parking sécurisé goudronné jusqu'à la maison 60.000x6+2 service immobilier 5000fr visite et 1mois commission 650.14.46.48 où 694534648",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche ",
      "eauElectricite": "Oui",
      "id": "b6109295dcd640fda3359c2ee16f9595",
      "lieu": "Simbock",
      "modalite": "60000 *6+2",
      "nombrePhoto": 5,
      "nombreVu": 3,
      "parking": "Oui",
      "photo": [
        "../../assets/img/9.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 60000,
      "securite": "Oui",
      "titre": "Studio à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Fri Jul 15 2022 11:54:19 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Studio flambant neuf à louer à mbalgon 60 et 80mil",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche ",
      "eauElectricite": "Oui",
      "id": "ab912125c64e4848a7c8a94464d70e05",
      "lieu": "Mendong ",
      "modalite": "80000 le mois ",
      "nombrePhoto": 8,
      "nombreVu": 7,
      "parking": "Oui",
      "photo": [
        "../../assets/img/10.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/1.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 80000,
      "securite": "Oui",
      "titre": "Studio à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Fri Jul 15 2022 11:33:56 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Studio moderne à louer à etoug ebe 65mil",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche",
      "eauElectricite": "Oui",
      "id": "4fc5daf13d0e4819b513d53ed7e9161d",
      "lieu": "Etoug ébé ",
      "modalite": "65000 le mois ",
      "nombrePhoto": 8,
      "nombreVu": 6,
      "parking": "Oui",
      "photo": [
        "../../assets/img/11.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/2.jpeg",
      ],
      "prix": 65000,
      "securite": "Oui",
      "titre": "Studio à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Thu Jul 14 2022 16:40:55 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Studio ultra moderne nouvellement construit à nkolbisson (IRAD) avec des pièces très spacieuse et lumineuse et un grand parking+forage\nComposition : chambre, cuisine, douche, salon.\nPrix :65000*7 ou 60.000*1an🤩",
      "detailPiece": "1 chambre 1 salon 1 cuisine 1 douche ",
      "eauElectricite": "Oui",
      "id": "b3cc1bb57e5b4872aaa56dd7b997435d",
      "lieu": "Nkolbisson",
      "modalite": "65000*7",
      "nombrePhoto": 7,
      "nombreVu": 3,
      "parking": "Oui",
      "photo": [
        "../../assets/img/1.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 65000,
      "securite": "Oui",
      "titre": "Studio moderne à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Thu Jul 14 2022 12:46:35 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Studio moderne haut standing avec toutes les commodités 100mil biyem assi",
      "detailPiece": "1 chambre 1 cuisine 1 salon 1 douche ",
      "eauElectricite": "Oui",
      "id": "6b6070adc5b74d82b396f8b67c183392",
      "lieu": "Biyem-Assi",
      "modalite": "100000 le mois ",
      "nombrePhoto": 8,
      "nombreVu": 8,
      "parking": "Oui",
      "photo": [
        "../../assets/img/2.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 100000,
      "securite": "Oui",
      "titre": "Studio moderne à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Thu Jul 14 2022 11:55:30 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "VASTE STUDIO VIP \nAVEC 2 DOUCHES, VASTE CUISINE, VASTE CHAMBRES, GRAND PARKING \nA 100.000f a etoug ébé\nGoudronné partout avec parking.\nLe taxi vous dépose vous entrez.",
      "detailPiece": "1 chambre 2 douches 1 salon 1 cuisine ",
      "eauElectricite": "Oui",
      "id": "2c7ad6c45a8749ffa340df9fea70806f",
      "lieu": "Etoug ébé ",
      "modalite": "100000 le mois ",
      "nombrePhoto": 8,
      "nombreVu": 2,
      "parking": "Oui",
      "photo": [
        "../../assets/img/3.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 100000,
      "securite": "Oui",
      "titre": "Studio moderne à louer ",
      "typeEchange": "A louer"
    },
    {
      "accessibilite": "Oui",
      "categorie": "Studio à louer",
      "datePublication": "Thu Jul 14 2022 11:38:55 GMT+0100 (West Africa Standard Time)",
      "dealerEmail": "smartwomen258@gmail.com",
      "description": "Studio moderne à louer à Oyomabang à 100fr du carrefour Meec avec parking et forage sécurité 24/24 \nComposition : chambre, cuisine, douche,salon,\nAccès :0m de l'axe principal\nPrix :65000*8mois😎",
      "detailPiece": "1 chambre 1 douche 1 salon 1 cuisine ",
      "eauElectricite": "Oui",
      "id": "9a8d81cfb06e4b4bb9bb9227dbfe34da",
      "lieu": "Oyom Abang",
      "modalite": "65000*8",
      "nombrePhoto": 6,
      "nombreVu": 3,
      "parking": "Oui",
      "photo": [
        "../../assets/img/4.jpeg",
        "../../assets/img/2.jpeg",
        "../../assets/img/3.jpeg",
        "../../assets/img/4.jpeg",
        "../../assets/img/5.jpeg",
        "../../assets/img/6.jpeg",
        "../../assets/img/8.jpeg",
        "../../assets/img/9.jpeg",
        "../../assets/img/10.jpeg",
        "../../assets/img/11.jpeg",
      ],
      "prix": 65000,
      "securite": "Oui",
      "titre": "Studio moderne à louer ",
      "typeEchange": "A louer"
    },
  ]
  constructor() { }
}
