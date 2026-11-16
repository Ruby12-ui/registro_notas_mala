
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
public class Asistencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "attendance_id")
    private Integer id;

    @Column(name = "student_id", nullable = false)
    private Integer estudianteId;

    @Column(name = "academic_period_id", nullable = false)
    private Integer periodoAcademicoId;

    @Column(name = "attendance_date", nullable = false)
    private LocalDate fechaAsistencia;

    @Column(name = "status", nullable = false)
    private String estado;

    @Column(name = "observations")
    private String observaciones;

    public Asistencia() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getEstudianteId() {
        return estudianteId;
    }

    public void setEstudianteId(Integer estudianteId) {
        this.estudianteId = estudianteId;
    }

    public Integer getPeriodoAcademicoId() {
        return periodoAcademicoId;
    }

    public void setPeriodoAcademicoId(Integer periodoAcademicoId) {
        this.periodoAcademicoId = periodoAcademicoId;
    }

    public LocalDate getFechaAsistencia() {
        return fechaAsistencia;
    }

    public void setFechaAsistencia(LocalDate fechaAsistencia) {
        this.fechaAsistencia = fechaAsistencia;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
