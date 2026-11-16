
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "grade_record")
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_record_id")
    private Integer id;

    @Column(name = "student_id", nullable = false)
    private Integer estudianteId;

    @Column(name = "assigment_id", nullable = false)
    private Integer asignacionId;

    @Column(name = "academic_period_id", nullable = false)
    private Integer periodoAcademicoId;

    @Column(name = "evaluation_name", nullable = false)
    private String nombreEvaluacion;

    @Column(name = "score", precision = 5, scale = 2, nullable = false)
    private BigDecimal nota;

    @Column(name = "evaluation_date")
    private LocalDate fechaEvaluacion;

    @Column(name = "observations")
    private String observaciones;

    public Nota() {
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

    public Integer getAsignacionId() {
        return asignacionId;
    }

    public void setAsignacionId(Integer asignacionId) {
        this.asignacionId = asignacionId;
    }

    public Integer getPeriodoAcademicoId() {
        return periodoAcademicoId;
    }

    public void setPeriodoAcademicoId(Integer periodoAcademicoId) {
        this.periodoAcademicoId = periodoAcademicoId;
    }

    public String getNombreEvaluacion() {
        return nombreEvaluacion;
    }

    public void setNombreEvaluacion(String nombreEvaluacion) {
        this.nombreEvaluacion = nombreEvaluacion;
    }

    public BigDecimal getNota() {
        return nota;
    }

    public void setNota(BigDecimal nota) {
        this.nota = nota;
    }

    public LocalDate getFechaEvaluacion() {
        return fechaEvaluacion;
    }

    public void setFechaEvaluacion(LocalDate fechaEvaluacion) {
        this.fechaEvaluacion = fechaEvaluacion;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
