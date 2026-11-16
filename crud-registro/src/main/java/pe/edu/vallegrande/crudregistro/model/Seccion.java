
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "section")
public class Seccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "section_id")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String nombre;

    @Column(name = "grade_id", nullable = false)
    private Integer gradoId;

    public Seccion() {
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

    public Integer getGradoId() {
        return gradoId;
    }

    public void setGradoId(Integer gradoId) {
        this.gradoId = gradoId;
    }
}
