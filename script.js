/*************************fonction de lancement du script**************************** */
$(function () {

    console.log("coucou")


    /************************************gestion des animations*****************************/


    function deplacementTitre() {
        $('#titreSite').animate({
            left: '600px'
        }, 3000, function () {
            $(this).css('color', 'orange')
        });
    }

    setInterval(deplacementTitre, 3000);
    deplacementTitre();

    function deplacementLogo() {
        $('#logo')
            .animate({ left: '1px' }, 1000, 'linear', function () { $(this).css('transform', 'rotateZ(180deg)') })
            .animate({ top: '1px' }, 1000, 'linear', function () { $(this).css('transform', 'rotateZ(0)') })
            .animate({ left: '1px' }, 1000, 'linear', function () { $(this).css('transform', 'rotateZ(30deg)') })
            .animate({ top: '' }, 500, 'linear', function () { $(this).css('transform', 'rotateZ(-30deg)') })
            .animate({ top: '+=1px' }, 500, 'linear', function () { $(this).css('transform', 'rotateZ(0)') })
            .animate({ top: '' }, 1000, 'linear');
    }

    timer2 = setInterval(deplacementLogo, 2000);
    deplacementLogo(); // lancement immédiat la premiere fois

    clearInterval(timer2);


    /************************************gestion du menu burger************************************************************/
    'use strict'
    
    let content = document.querySelector('#hamburger-content'),
        sideBarBody = document.querySelector("#hamburger-sidebar-body"),
        btn = document.querySelector("#hamburger-button"),
        overlay = document.querySelector("#hamburger-overlay"),
        activatedClass = "hamburger-activated"

    sideBarBody.innerHTML = content.innerHTML;

    btn.addEventListener("click", function () {
        console.log("coucou")
        this.parentNode.classList.add(activatedClass);
    })

    overlay.addEventListener("click", function () {
        console.log("coucou2")
        this.parentNode.classList.remove(activatedClass);
    })


    /***************************gestion du formulaire************************ */

    const nom = document.getElementById("nom"),
        prenom = document.getElementById("prenom"),
        email = document.getElementById("email"),
        message = document.getElementById("message"),
        submit = document.querySelector("button[type='submit']"),
        form = document.querySelector("form")

    if (submit) {
        submit.addEventListener("click", checkForm)
    }

    function checkForm(evt) {
        evt.preventDefault()

        //je supprime toutes les informations du localStorage :
        localStorage.clear()

        checkRegex(nom, "nom", 3, 20)
        checkRegex(prenom, "prénom", 2, 35)
        checkRegex(email, "email", 10, 255)
        checkRegex(message, "message", 50, 500)

        //on vérifie le contenu du localStorage :
        if (
            (localStorage.getItem("nom") &&
                localStorage.getItem("prénom") &&
                localStorage.getItem("email") &&
                localStorage.getItem("message")) != "false"
        ) {
            let newDiv = document.createElement("div")
            newDiv.className = "alert alert-success"
            newDiv.innerText = "Vos données ont bien été envoyées"

            let newUl = document.createElement("ul")

            for (let i = 1; i <= localStorage.length; i++) {
                let newLi = document.createElement("li")
                newLi.innerText =
                    Object.keys(localStorage)[
                    i - 1
                    ] +
                    " : " +
                    Object.values(localStorage)[
                    i - 1
                    ]
                newUl.appendChild(newLi)
            }

            form.parentElement.insertBefore(newDiv, form)
            form.parentElement.insertBefore(newUl, form)
            //disparation du formulaire :
            form.style.display = "none"
            //on vide le localStorage :
            localStorage.clear()
        }
    }

    console.dir(Object.values(localStorage))
    function checkRegex(field, text, min, max) {
        //on rajoute la class d-none à la div qui contient le message d'erreur :

        field.nextElementSibling.classList.add("d-none")

        //on supprime les espaces et on vérifie la longueur des champs :
        if (
            field.value.trim().length >= min &&
            field.value.trim().length <= max
        ) {
            //vérification des caractères spéciaux :
            //on exclut le champ email et le champ message :

            //1- vérification format de l'email :
            if (field.type === "email") {
                if (
                    !/^\w+([\._-]?\w+)*@\w+([\._-]?\w+)*(\.\w{2,4})+$/.test(
                        field.value
                    )
                ) {
                    field.nextElementSibling.classList.remove(
                        "d-none"
                    )
                    field.nextElementSibling.innerText = `Format de l'email incorrect : ${field.value};`
                    //on indique une erreur dans le localStorage :
                    localStorage.setItem(
                        text,
                        false
                    )
                } else {
                    //si aucune erreur dans l'email, on rajoute l'info dans le localStorage
                    localStorage.setItem(
                        text,
                        field.value
                    )
                }
            } else if (field.type === "textarea") {
                //on remplace les <> pour des entités html : cf. XSS
                field.value = field.value
                    .replace(/\</g, "&lt;")
                    .replace(/\>/g, "&gt;")
                localStorage.setItem(text, field.value)
            } else {
                //si le type n'est ni email, ni textarea :
                if (!/^([A-zÀ-ú])*$/.test(field.value)) {
                    field.nextElementSibling.classList.remove(
                        "d-none"
                    )
                    field.nextElementSibling.innerText = `Attention ! présence de caractères interdits sur le champ ${text}`
                    //on indique une erreur dans le localStorage :
                    localStorage.setItem(
                        text,
                        false
                    )
                } else {
                    //si aucune erreur, on rajoute l'info dans le localStorage
                    localStorage.setItem(
                        text,
                        field.value
                    )
                }
            }
            //si les champs sont vides
        } else {
            field.nextElementSibling.classList.remove("d-none")
            field.nextElementSibling.innerText = `Le champ ${text} doit être compris entre ${min} et ${max} caractères`
            //on indique une erreur dans le localStorage :
            localStorage.setItem(text, false)
        }
    }




});