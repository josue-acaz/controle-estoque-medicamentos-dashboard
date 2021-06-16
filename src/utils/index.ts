export function maskCnpj(v: string) {
    if(v.length > 18) {
        return v.substring(0, v.length-1);
    }
    
    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, '');
  
    //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
  
    //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  
    //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
  
    //Coloca um hífen depois do bloco de quatro dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
  
    return v;
}

export function maskDate(date: string) {
    if(!date) return "";

    if(date.length > 10) {
        return date.substring(0, date.length-1);
    }

    let v = date.replace(/\D/g,'').slice(0, 10);
    if (v.length >= 5) {
        return `${v.slice(0,2)}/${v.slice(2,4)}/${v.slice(4)}`;
    }
    else if (v.length >= 3) {
        return `${v.slice(0,2)}/${v.slice(2)}`;
    }
    return v
}

export function currency(value: number, disable_symbol?: boolean) {
    let currency_number = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);

    if(disable_symbol) {
        currency_number = currency_number.split("R$ ").join("");
    }

    return currency_number;
}

export function maskPhoneNumber(value: string) {
    if(value.length > 14) {
      return value.substring(0, value.length-1);
    }
  
    // Máscara Telefone
    function mtel(v: string) {
      v = v.toString().replace(/^(\d{2})(\d)/g, '($1)$2'); //Coloca parênteses em volta dos dois primeiros dígitos
      v = v.toString().replace(/(\d)(\d{4})$/, '$1-$2'); //Coloca hífen entre o quarto e o quinto dígitos
      return v;
    }
  
    //Remove tudo o que não é dígito
    value = value.replace(/\D/g, '');
    return mtel(value);
}

export function onlyNumbers(value: string) {
    return value.replace(/[^0-9]+/g, "");
}

export function maskCurrency(currency: string) {
    let v = currency.replace(/\D/g,'');
    v = (Number(v)/100).toFixed(2) + '';
    v = v.replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    
    return v;
}

export function currencyToNumber(value: string) {
    const fractional = value.split(",")[1];
    const price = value.split(",")[0];
    
    return(Number(`${price.split(".").join("")}.${fractional}`));
}