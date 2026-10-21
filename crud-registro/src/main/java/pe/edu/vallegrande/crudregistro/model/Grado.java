
package pe.edu.vallegrande.crudregistro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "grade")
public class Grado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Integer id;

    @Column(name = "name", nullable = false)
    private String nombre;

    @Column(name = "educational_level")
    private String nivelEducativo;

    public Grado() {
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

    public String getNivelEducativo() {
        return nivelEducativo;
    }

    public void setNivelEducativo(String nivelEducativo) {
        this.nivelEducativo = nivelEducativo;
    }
}
