
package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Curso;
import java.util.List;

public interface CursoService {

    List<Curso> listarTodos();

    Curso buscarPorId(Integer id);

    Curso guardar(Curso curso);

    Curso actualizar(Integer id, Curso curso);

    void eliminar(Integer id);
}
