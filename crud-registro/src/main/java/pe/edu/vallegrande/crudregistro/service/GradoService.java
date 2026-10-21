
package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Grado;
import java.util.List;

public interface GradoService {

    List<Grado> listarTodos();

    Grado buscarPorId(Integer id);

    Grado guardar(Grado grado);

    Grado actualizar(Integer id, Grado grado);

    void eliminar(Integer id);
}
