
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "academic_period")
public class PeriodoAcademico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "academic_period_id")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String nombre;

    @Column(name = "start_date")
    private LocalDate fechaInicio;

    @Column(name = "end_date")
    private LocalDate fechaFin;

    @Column(name = "status")
    private String estado;

    public PeriodoAcademico() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
