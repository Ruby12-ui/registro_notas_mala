
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Apoderado;
import pe.edu.vallegrande.crudregistro.service.ApoderadoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/apoderados")
@CrossOrigin(origins = "http://localhost:4200")
public class ApoderadoRest {

    private final ApoderadoService apoderadoService;

    public ApoderadoRest(ApoderadoService apoderadoService) {
        this.apoderadoService = apoderadoService;
    }

    @GetMapping
    public ResponseEntity<List<Apoderado>> listarTodos() {
        return ResponseEntity.ok(apoderadoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Apoderado> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(
                apoderadoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Apoderado> guardar(
            @RequestBody Apoderado apoderado) {
        Apoderado nuevo = apoderadoService.guardar(apoderado);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Apoderado> actualizar(
            @PathVariable Integer id,
            @RequestBody Apoderado apoderado) {
        return ResponseEntity.ok(
                apoderadoService.actualizar(id, apoderado));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        apoderadoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
