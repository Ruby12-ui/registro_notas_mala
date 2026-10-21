
package pe.edu.vallegrande.crudregistro.repository;

import pe.edu.vallegrande.crudregistro.model.Apoderado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApoderadoRepository
        extends JpaRepository<Apoderado, Integer> {
}
