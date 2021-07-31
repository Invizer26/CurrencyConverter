Vue.component('currencyList', {
    props: {
        currencies: {
            type: Object,
            required: true
        },
        currency: {
            type: Object,
            required: true
        },
        mainValute: {
            type: String
        },
        search: {
            type: String
        }
    },
    template: `
        
            <li v-if="currency.CharCode.toLowerCase().includes(search.toLowerCase()) || currency.Name.toLowerCase().includes(search.toLowerCase())" class="currencyList__element">
                <div class="currencyName">
                    {{currency.Name}}
                </div>
                <div class="row-container">
                    <div class="currencyCode">
                        {{currency.Nominal}} {{currency.CharCode}}
                    </div>
                    <div class="currencyRate">
                        {{rate}} {{mainValute}}
                    </div>
                    <div v-if="currency.Value > currency.Previous" class="currencyChange up">
                        &#8593; {{change}}
                    </div>
                    <div v-else class="currencyChange down">
                        &#8595; {{change}}
                    </div>
                </div>
            </li>


        `,

    data: function () {
        return {

        }
    },
    computed: {
        rate: function () {
            if (this.mainValute == 'RUB') {
                return this.currency.Value;
            } else {
                return (this.currency.Value / this.currencies[this.mainValute].Value / this.currencies[this.mainValute].Nominal).toFixed(4);
            }
        },
        change: function () {
            return Math.abs(this.currency.Value - this.currency.Previous).toFixed(4)
        }
    }
})



let app = new Vue({
    el: '.container',
    data: {
        currencies: {},
        mainValute: 'RUB',
        search: '',
        baseCurrency: {
            name: 'USD',
            value: 0
        },
        resultCurrency: {
            name: 'EUR',
            value: 0
        }
    },
    methods: {
        convert: function () {
            this.resultCurrency.value = ((this.currencies[this.baseCurrency.name].Value / this.currencies[this.baseCurrency.name].Nominal) /
                (this.currencies[this.resultCurrency.name].Value / this.currencies[this.resultCurrency.name].Nominal) * this.baseCurrency.value).toFixed(4);
        },
        reverse: function () {
            let tempName = this.resultCurrency.name;
            let tempValue = this.resultCurrency.value;
            this.resultCurrency.name = this.baseCurrency.name;
            this.resultCurrency.value = this.baseCurrency.value;
            this.baseCurrency.name = tempName;
            this.baseCurrency.value = tempValue;

        }
    }
})



fetch('//www.cbr-xml-daily.ru/daily_json.js')
    .then(r => r.json())
    .then(json => app.currencies = json.Valute)








