Qrgen 
----
Generation de QRCode depuis une donnee de type text  
cet outil est  dans sa version alpha  mais peut faire le taf  ... 
il est juste disponible dans sa version command line pour l'urgence en deduisant  que ca fera l'affaire 
le temps d'apporter des ameliorations sur les jours a venir. 
 
Avant de lancer le programme 
1) s'assurer d'avoir python3 disponible  

Maintenant Pour lancer le programme 
1) creer un environment virtuelle pour ne pas poluer votre system. 
> $ python3 -m venv <nom>  
     exemple : $ python3 -m venv dist 

2) Lancer l'environement virtuel
> $ source <nom>/bin/activate
     exemple : $ source dist/bin/activate

[optionnel] faire un update  de la command pip 
	
	exemple  : $ python3 -m pip install --upgrade pip  

vous aurez un indiacteur sur votre shell  pour montrer que vous etes dans votre environement  
(dist)$ 

3) Vous avez a votre disposition  a un ficher nomme <requirements.txt>  qui enferme les dependances de l'outil et pour vous faire gagner du temps  

> $ python3 -m pip install -r  requirements.txt   [oubien] pip install -r requirements.txt 

il telechargera toutes les dependances . 
Maintenant  vous pouvez commencez a tester 

> $ python3  Qrgen.py -h  pour plus d'info  ou  l'option -v  pour afficher  le copyright  
-------------------------------------------------------------------------------

On peut manipuler a notre guise  le qrcode qui doit etre generer  
y'a aussi possibilite  d'ajouter des couleurs ou meme placer un logo au milieu du QR code  pour plus de style 


EXEMPLE  :  
(dist)$ python3  Qrgen.py  -i  "text data "  -o  monimgqrcode 

![monimgqrcode](assets/imgs/monimgqrcode.png)  

(dist)$ python3  Qrgen.py  -i  "text data "  -o  monimgqrcode4  -b teal   -l teranga.png

![monimgqrcode4](assets/imgs/monimgqrcode4.png)  

(dist)$ python3  Qrgen.py  -i  "text data "  -o  monimgqrcode3  -c black -b red 
[monimgqrcode3](assets/imgs/monimgqrcode3.png) 

(dist)$ python3  Qrgen.py  -i  "text data "  -o  monimgqrcode2   -c blue
 
![monimgqrcode2](assets/imgs/monimgqrcode2.png)


_* Vous pouvez combiner les options ..._

#### AMELIORATION A VENIR
```
il sera disponible  en version graphique  bientot 
bien entendu il sera packager en version binaire  pour window mac  et linux  
----
```

.
.
.
```
!-!4PP\/ !-!4CK1NG F0Lk5 ...
      /
```

