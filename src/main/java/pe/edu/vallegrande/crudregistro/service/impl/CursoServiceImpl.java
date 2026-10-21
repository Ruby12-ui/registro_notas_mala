
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Curso;
import pe.edu.vallegrande.crudregistro.repository.CursoRepository;
import pe.edu.vallegrande.crudregistro.service.CursoService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class CursoServiceImpl implements CursoService {

    private final CursoRepository cursoRepository;

    public CursoServiceImpl(CursoRepository cursoRepository) {
        this.cursoRepository = cursoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Curso> listarTodos() {
        return cursoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Curso buscarPorId(Integer id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró el curso con ID: " + id
                ));
    }

    @Override
    public Curso guardar(Curso curso) {
        curso.setId(null);

        if (curso.getEstado() == null
                || curso.getEstado().isBlank()) {
            curso.setEstado("ACTIVO");
        }

        return cursoRepository.save(curso);
    }

    @Override
    public Curso actualizar(Integer id, Curso datos) {
        Curso existente = buscarPorId(id);

        existente.setNombre(datos.getNombre());
        existente.setDescripcion(datos.getDescripcion());
        existente.setNivelEducativo(datos.getNivelEducativo());
        existente.setEstado(datos.getEstado());

        return cursoRepository.save(existente);
    }

    @Override
    public void eliminar(Integer id) {
        Curso curso = buscarPorId(id);
        cursoRepository.delete(curso);
    }
}
