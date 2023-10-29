import {validateData} from '../components/Form/StudensForms/CareerData/CareerData';


describe("Prueba función del componente CareerData", () => {
    
    describe("Prueba función ValidateData", () => {
       
        test("Debe devolver '' si data = '' independientemente de name", () => {
            expect(validateData({'curriculum': ''}, 'curriculum')).toBe('')
        }),
        
        test("Debe devolver '' si data = null independientemente de name", () => {
            expect(validateData({'curriculum': null}, 'curriculum')).toBe('')
        })
       
        test("Debe devolver 'El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal' si name = 'average' y data < 0 ", () => {
            expect(validateData({'average': '-1'}, 'average')).toBe("El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal")
        })
       
        test("Debe devolver 'El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal' si name = 'averageWithFails' y data < 0 ", () => {
            expect(validateData({'averageWithFails':'-1'}, 'averageWithFails')).toBe("El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal")
        })
       
        test("Debe devolver 'El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal' si name = 'average' y data > 10 ", () => {
            expect(validateData({'average':'11'}, 'average')).toBe("El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal")
        })
       
        test("Debe devolver 'El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal' si name = 'averageWithFails' y data > 10 ", () => {
            expect(validateData({'averageWithFails':'11'}, 'averageWithFails')).toBe("El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal")
        })
       
        test("Debe devolver 'El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal' si name = 'average' y data no tiene formato 00.00", () => {
            expect(validateData({'average':'2,00'} , 'average')).toBe("El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal")
        })
        
        test("Debe devolver 'El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal' si name = 'averageWithFails' y data no tiene formato 00.00", () => {
            expect(validateData({'averageWithFails':'2,00'}, 'averageWithFails')).toBe("El promedio debe estar en el rango de 0 a 10 y debe tener el formato 00.00 si es decimal")
        })
       
        test("Debe devolver '' si name = 'average' y data es un valor en el rango de 0 a 10 y cumple con el formato 00.00 si es decimal ", () => {
            expect(validateData({'average':'2.00'} , 'average')).toBe('')
        })
        
        test("Debe devolver si name = 'averageWithFails' y data es un valor en el rango de 0 a 10 y cumple con el formato 00.00 si es decimal   '", () => {
            expect(validateData({'averageWithFails': '2.22'}, 'averageWithFails')).toBe('')
        })
       
        test("Debe devolver 'La cantidad de materias aprobadas debe estar en el rango de 0 a 60' si name = 'approvedSubjects' y data < 0", ()=>{
            expect(validateData({'approvedSubjects':'-1'}, 'approvedSubjects')).toBe('La cantidad de materias aprobadas debe estar en el rango de 0 a 60')
        })
       
        test("Debe devolver 'La cantidad de materias aprobadas debe estar en el rango de 0 a 60' si name = 'approvedSubjects' y data > 60", ()=>{
            expect(validateData({'approvedSubjects':'61'}, 'approvedSubjects')).toBe('La cantidad de materias aprobadas debe estar en el rango de 0 a 60')
        })
       
        test("Debe devolver '' si name = 'approvedSubjects' y data esta en el rango de 0 a 60", ()=>{
            expect(validateData({'approvedSubjects':'58'}, 'approvedSubjects')).toBe('')
        })
       
        test("Debe devolver 'El Plan solo acepta años entre 1900 y 2200' si name = 'studyProgram' y data < 1900", () =>{
            expect(validateData({'studyProgram':'1800'},'studyProgram')).toBe('El Plan solo acepta años entre 1900 y 2200')
        })
       
        test("Debe devolver 'El Plan solo acepta años entre 1900 y 2200' si name = 'studyProgram' y data > 2200", () =>{
            expect(validateData({'studyProgram':'2300'},'studyProgram')).toBe('El Plan solo acepta años entre 1900 y 2200')
        })
       
        test("Debe devolver '' si name = 'studyProgram' y data esta en el rango de 1900 a 2200", () =>{
            expect(validateData({'studyProgram':'2000'},'studyProgram')).toBe('')
        })

    })
})
