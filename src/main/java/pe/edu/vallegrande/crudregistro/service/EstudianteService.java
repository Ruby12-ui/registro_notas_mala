
package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Estudiante;

import java.util.List;
import java.util.Optional;

public interface EstudianteService {

    List<Estudiante> listarTodos();

    Optional<Estudiante> buscarPorId(Integer id);

    Estudiante guardar(Estudiante estudiante);

    Optional<Estudiante> actualizar(Integer id, Estudiante estudiante);

    boolean eliminar(Integer id);
}
