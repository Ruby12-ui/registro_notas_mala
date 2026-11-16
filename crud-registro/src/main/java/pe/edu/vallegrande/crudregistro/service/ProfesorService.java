package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Profesor;

import java.util.List;
import java.util.Optional;

public interface ProfesorService {

    List<Profesor> listarTodos();

    Optional<Profesor> buscarPorId(Integer id);

    Profesor guardar(Profesor profesor);

    Optional<Profesor> actualizar(
            Integer id,
            Profesor profesor
    );

    boolean eliminar(Integer id);
}
