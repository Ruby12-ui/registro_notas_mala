package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "teacher")
public class Profesor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private Integer id;

    @Column(name = "document_type", nullable = false)
    private String tipoDocumento;

    @Column(name = "document_number", nullable = false)
    private String numeroDocumento;

    @Column(name = "first_name", nullable = false)
    private String nombres;

    @Column(name = "last_name", nullable = false)
    private String apellidos;

    @Column(name = "specialty")
    private String especialidad;

    @Column(name = "phone")
    private String telefono;

    @Column(name = "email")
    private String email;

    @Column(name = "hire_date")
    private LocalDate fechaContratacion;

    @Column(name = "status", nullable = false)
    private String estado;

    public Profesor() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumeroDocumento() {
        return numeroDocumento;
    }

    public void setNumeroDocumento(String numeroDocumento) {
        this.numeroDocumento = numeroDocumento;
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

    public String getEspecialidad() {
        return especialidad;
    }

    public void setEspecialidad(String especialidad) {
        this.especialidad = especialidad;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getFechaContratacion() {
        return fechaContratacion;
    }

    public void setFechaContratacion(LocalDate fechaContratacion) {
        this.fechaContratacion = fechaContratacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
