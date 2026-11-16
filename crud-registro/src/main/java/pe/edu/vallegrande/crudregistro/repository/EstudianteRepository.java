
package pe.edu.vallegrande.crudregistro.repository;

import pe.edu.vallegrande.crudregistro.model.Estudiante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Integer> {

    boolean existsByCodigoEstudiante(String codigoEstudiante);

    boolean existsByDni(String dni);
}
