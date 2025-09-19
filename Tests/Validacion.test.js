const Boleta = require('../Classes/Validacion');

describe('Validacion de boleta',()=>{
        test('Validacion boleta casos aceptados',()=>{
            expect(Boleta.EsBoleta("2019640034")).toBe(true);
        });

        test('Validacion boleta casos no aceptados',()=>{
            expect(Boleta.EsBoleta("201964003")).toBe(false);
            expect(Boleta.EsBoleta("20196H4003A")).toBe(false);
            expect(Boleta.EsBoleta("20196Ha4003As")).toBe(false);
            expect(Boleta.EsBoleta("2019 a4003As")).toBe(false);
            expect(Boleta.EsBoleta("2019-a4003*s")).toBe(false);
            expect(Boleta.EsBoleta("")).toBe(false);
            expect(Boleta.EsBoleta(" ")).toBe(false);
            expect(Boleta.EsBoleta("          ")).toBe(false);
        });
    }
);
