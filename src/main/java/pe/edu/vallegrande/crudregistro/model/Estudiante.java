
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer id;

    @Column(name = "student_code", nullable = false, unique = true, length = 20)
    private String codigoEstudiante;

    @Column(name = "document_number", nullable = false, unique = true, length = 20)
    private String dni;

    @Column(name = "first_name", nullable = false, length = 100)
    private String nombres;

    @Column(name = "last_name", nullable = false, length = 100)
    private String apellidos;

    @Column(name = "birth_date")
    private LocalDate fechaNacimiento;

    @Column(name = "gender", length = 20)
    private String genero;

    @Column(name = "address", length = 250)
    private String direccion;

    @Column(name = "photo_url", length = 500)
    private String fotoUrl;

    @Column(name = "grade_id", nullable = false)
    private Integer gradoId;

    @Column(name = "section_id", nullable = false)
    private Integer seccionId;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate fechaMatricula;

    @Column(name = "status", nullable = false, length = 20)
    private String estado;

    public Estudiante() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodigoEstudiante() {
        return codigoEstudiante;
    }

    public void setCodigoEstudiante(String codigoEstudiante) {
        this.codigoEstudiante = codigoEstudiante;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombres() {
        return nombres;
    }

    public void setNombres(String nombres) {
        this.nombres = nombres;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
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

    public LocalDate getFechaMatricula() {
        return fechaMatricula;
    }

    public void setFechaMatricula(LocalDate fechaMatricula) {
        this.fechaMatricula = fechaMatricula;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
