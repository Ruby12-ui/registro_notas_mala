
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "teacher_assignment")
public class AsignacionDocente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assigment_id")
    private Integer id;

    @Column(name = "teacher_id", nullable = false)
    private Integer profesorId;

    @Column(name = "course_id", nullable = false)
    private Integer cursoId;

    @Column(name = "grade_id", nullable = false)
    private Integer gradoId;

    @Column(name = "section_id", nullable = false)
    private Integer seccionId;

    @Column(name = "academic_period_id", nullable = false)
    private Integer periodoAcademicoId;

    public AsignacionDocente() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getProfesorId() {
        return profesorId;
    }

    public void setProfesorId(Integer profesorId) {
        this.profesorId = profesorId;
    }

    public Integer getCursoId() {
        return cursoId;
    }

    public void setCursoId(Integer cursoId) {
        this.cursoId = cursoId;
    }

    public Integer getGradoId() {
        return gradoId;
    }

    public void setGradoId(Integer gradoId) {
        this.gradoId = gradoId;
    }

    public Integer getSeccionId() {
        return seccionId;
    }

    public void setSeccionId(Integer seccionId) {
        this.seccionId = seccionId;
    }

    public Integer getPeriodoAcademicoId() {
        return periodoAcademicoId;
    }

    public void setPeriodoAcademicoId(Integer periodoAcademicoId) {
        this.periodoAcademicoId = periodoAcademicoId;
    }
}
