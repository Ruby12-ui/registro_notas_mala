
package pe.edu.vallegrande.crudregistro.repository;

import pe.edu.vallegrande.crudregistro.model.Seccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeccionRepository
        extends JpaRepository<Seccion, Integer> {

    List<Seccion> findByGradoId(Integer gradoId);
}
