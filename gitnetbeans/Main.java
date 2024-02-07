/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package gitnetbeans;

/**
 *
 * @author Daw1
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
         double horasTrabajadas = 40.0; // Ejemplo: 40 horas trabajadas en la semana
        double sueldoNeto = CalculadoraSueldoEspañol.calcularSueldoNeto(horasTrabajadas);
        System.out.println("El sueldo neto es: " + sueldoNeto + " euros");
    }
    
}
