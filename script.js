// Fonction de conversion pour le français
function convertToFrench(number) {
    const ones = ["", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"];
    const teens = ["dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
    const tens = ["", "dix", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];

    if (number == 0) return "zéro";

    let words = [];

    // Séparer la partie entière et la partie décimale
    let parts = number.toString().split('.');
    let integerPart = parseInt(parts[0]);
    let decimalPart = parts[1] || ''; // Partie décimale (si elle existe)

    if (Math.floor(integerPart / 1000000) > 0) {
        words.push(convertToFrench(Math.floor(integerPart / 1000000)) + " million");
        integerPart %= 1000000;
    }

    if (Math.floor(integerPart / 1000) > 0) {
        if (Math.floor(integerPart / 1000) == 1) {
            words.push("mille");
        } else {
            words.push(convertToFrench(Math.floor(integerPart / 1000)) + " mille");
        }
        integerPart %= 1000;
    }

    if (Math.floor(integerPart / 100) > 0) {
        if (Math.floor(integerPart / 100) == 1) {
            words.push("cent");
        } else {
            words.push(ones[Math.floor(integerPart / 100)] + " cent");
        }
        integerPart %= 100;
    }

    if (integerPart > 0) {
        if (integerPart < 10) {
            words.push(ones[integerPart]);
        } else if (integerPart < 20) {
            words.push(teens[integerPart - 10]);
        } else {
            let ten = Math.floor(integerPart / 10);
            let unit = integerPart % 10;
            if (ten === 7 || ten === 9) {
                words.push(tens[ten - 1] + "-" + teens[unit]);
            } else {
                words.push(tens[ten] + (unit ? "-" + ones[unit] : ""));
            }
        }
    }

    // Convertir la partie décimale chiffre par chiffre
    if (decimalPart) {
        words.push("virgule");


        if (Math.floor(decimalPart / 1000000) > 0) {
            words.push(convertToFrench(Math.floor(decimalPart / 1000000)) + " million");
            decimalPart %= 1000000;
        }
    
        if (Math.floor(decimalPart / 1000) > 0) {
            if (Math.floor(decimalPart / 1000) == 1) {
                words.push("mille");
            } else {
                words.push(convertToFrench(Math.floor(decimalPart / 1000)) + " mille");
            }
            decimalPart %= 1000;
        }
    
        if (Math.floor(decimalPart / 100) > 0) {
            if (Math.floor(decimalPart / 100) == 1) {
                words.push("cent");
            } else {
                words.push(ones[Math.floor(decimalPart / 100)] + " cent");
            }
            decimalPart %= 100;
        }
    
        if (decimalPart > 0) {
            if (decimalPart < 10) {
                words.push(ones[decimalPart]);
            } else if (decimalPart < 20) {
                words.push(teens[decimalPart - 10]);
            } else {
                let ten = Math.floor(decimalPart / 10);
                let unit = decimalPart % 10;
                if (ten === 7 || ten === 9) {
                    words.push(tens[ten - 1] + "-" + teens[unit]);
                } else {
                    words.push(tens[ten] + (unit ? "-" + ones[unit] : ""));
                }
            }
        }

    }

    return words.join(" ").trim();
}





// Fonction de conversion pour l'anglais
function convertToEnglish(number) {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const thousands = ["", "thousand", "million", "billion", "trillion"];

    if (number == 0) return "zero";

    let word = '';
    let numStr = number.toString();
    let chunkCount = Math.ceil(numStr.length / 3);

    for (let i = 0; i < chunkCount; i++) {
        let chunk = parseInt(numStr.slice(-3));
        numStr = numStr.slice(0, -3);

        if (chunk) {
            let chunkWord = '';
            if (chunk > 99) {
                chunkWord += ones[Math.floor(chunk / 100)] + " hundred ";
                chunk %= 100;
            }
            if (chunk > 10 && chunk < 20) {
                chunkWord += teens[chunk - 10] + " ";
            } else {
                chunkWord += tens[Math.floor(chunk / 10)] + " ";
                chunk %= 10;
                chunkWord += ones[chunk] + " ";
            }
            word = chunkWord + thousands[i] + " " + word;
        }
    }

    // Ajouter la gestion de la partie décimale
    if (number % 1 !== 0) {
        let decimalPart = number.toString().split('.')[1];
        word += " point ";
        for (let i = 0; i < decimalPart.length; i++) {
            word += ones[parseInt(decimalPart[i])] + " ";
        }
    }

    return word.trim();
}








function convertAmount() {
    const amountInput = document.getElementById('amount');
    const amount = amountInput.value.trim();

    // Vérifier si l'entrée est vide ou invalide
    if (!amount.match(/^\d*\.?\d*$/) || amount === '.') {
        alert('Veuillez entrer un nombre valide.');
        console.log('ddddddddddd')
        return;
    }

    const language = document.getElementById('language').value;
    let result;

    switch (language) {
        case 'fr':
            result = convertToFrench(amount);
            break;
        case 'en':
            result = convertToEnglish(amount);
            break;
        default:
            result = "Sélectionnez une langue";
    }

    document.getElementById('result').innerText = result;
}

