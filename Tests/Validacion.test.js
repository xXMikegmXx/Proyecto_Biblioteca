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

const Correo = require('../Classes/Validacion');

describe ('Validacion de correo',()=> {
    test('Validacion correo casos aceptados',()=>{
        expect(Correo.EsCorreo("mgomezm1500@alumno.ipn.mx")).toBe(true);
        expect(Correo.EsCorreo("alumno@gmail.com")).toBe(true);
        expect(Correo.EsCorreo("profe@ipn.mx")).toBe(true);
        expect(Correo.EsCorreo("alumno@yahoo.com")).toBe(true);
        expect(Correo.EsCorreo("alumno@outlook.com")).toBe(true);
        expect(Correo.EsCorreo("alumno@hotmail.com")).toBe(true);
        expect(Correo.EsCorreo("NOMBRE.APELLIDO@GMAIL.COM")).toBe(true);  
        expect(Correo.EsCorreo("user+alias@outlook.com")).toBe(true);      
        expect(Correo.EsCorreo("alumno123@yahoo.com")).toBe(true);         
        expect(Correo.EsCorreo("m.gomez@ipn.mx")).toBe(true);
    });
    test('Validacion correo casos no aceptados',()=>{
        expect(Correo.EsCorreo("JuanHernandez@mercadolibre.com")).toBe(false);
        expect(Correo.EsCorreo("alumno@gmail.")).toBe(false);
        expect(Correo.EsCorreo("alumno@ .com")).toBe(false);
        expect(Correo.EsCorreo("alumno@@.com")).toBe(false);
        expect(Correo.EsCorreo("alumnogmail.com")).toBe(false);
        expect(Correo.EsCorreo("alumno@gmailcom")).toBe(false);
        expect(Correo.EsCorreo("@gmail.com")).toBe(false);
        expect(Correo.EsCorreo(" @gmail.com")).toBe(false);
        expect(Correo.EsCorreo("alumno@subdominio.ipn.mx")).toBe(false);
        expect(Correo.EsCorreo("alumno@GMAIL.con")).toBe(false);
        expect(Correo.EsCorreo("alumno@ipn.com")).toBe(false);
        expect(Correo.EsCorreo("alumno@")).toBe(false);
        expect(Correo.EsCorreo("alumno@ outlook.com")).toBe(false);
        expect(Correo.EsCorreo("alumno@localhost")).toBe(false);
        expect(Correo.EsCorreo("alumno@empresa.corporate")).toBe(false);
        expect(Correo.EsCorreo("")).toBe(false);
        expect(Correo.EsCorreo(" ")).toBe(false);
        expect(Correo.EsCorreo("          ")).toBe(false);
    })
})