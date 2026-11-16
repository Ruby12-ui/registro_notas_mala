
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Apoderado;
import pe.edu.vallegrande.crudregistro.repository.ApoderadoRepository;
import pe.edu.vallegrande.crudregistro.service.ApoderadoService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class ApoderadoServiceImpl implements ApoderadoService {

    private final ApoderadoRepository apoderadoRepository;

    public ApoderadoServiceImpl(
            ApoderadoRepository apoderadoRepository) {
        this.apoderadoRepository = apoderadoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Apoderado> listarTodos() {
        return apoderadoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Apoderado buscarPorId(Integer id) {
        return apoderadoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró el apoderado con ID: " + id
                ));
    }

    @Override
    public Apoderado guardar(Apoderado apoderado) {
        apoderado.setId(null);
        return apoderadoRepository.save(apoderado);
    }

    @Override
    public Apoderado actualizar(Integer id, Apoderado datos) {
        Apoderado existente = buscarPorId(id);

        existente.setNumeroDocumento(datos.getNumeroDocumento());
        existente.setNombres(datos.getNombres());
        existente.setApellidos(datos.getApellidos());
        existente.setTelefono(datos.getTelefono());
        existente.setEmail(datos.getEmail());
        existente.setDireccion(datos.getDireccion());

        return apoderadoRepository.save(existente);
    }

    @Override
    public void eliminar(Integer id) {
        Apoderado apoderado = buscarPorId(id);
        apoderadoRepository.delete(apoderado);
    }
}
