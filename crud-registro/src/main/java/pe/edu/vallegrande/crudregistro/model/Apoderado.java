
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "guardian")
public class Apoderado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guardian_id")
    private Integer id;

    @Column(name = "document_number")
    private String numeroDocumento;

    @Column(name = "first_name", nullable = false)
    private String nombres;

    @Column(name = "last_name", nullable = false)
    private String apellidos;

    @Column(name = "phone")
    private String telefono;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String direccion;

    public Apoderado() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
