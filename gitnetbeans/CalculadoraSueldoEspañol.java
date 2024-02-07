/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package gitnetbeans;

/**
 *
 * @author Daw1
 */
public class CalculadoraSueldoEspañol {
     private static final double SALARIO_BASE = 1500.00;
    private static final double HORAS_EXTRA_PRECIO = 20.00;
    private static final double DESCUENTO_IRPF = 0.15;
    private static final double DESCUENTO_SEGURIDAD_SOCIAL = 0.067;

    public static double calcularSueldoNeto(double horasTrabajadas) {
        double salarioBruto = SALARIO_BASE + (horasTrabajadas * HORAS_EXTRA_PRECIO);
        double descuentoIRPF = salarioBruto * DESCUENTO_IRPF;
        double descuentoSeguridadSocial = salarioBruto * DESCUENTO_SEGURIDAD_SOCIAL;
        double sueldoNeto = salarioBruto - descuentoIRPF - descuentoSeguridadSocial;
        return sueldoNeto;
    }
}
