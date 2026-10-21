
package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.PeriodoAcademico;
import pe.edu.vallegrande.crudregistro.service.PeriodoAcademicoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/periodos-academicos")
@CrossOrigin(origins = "http://localhost:4200")
public class PeriodoAcademicoRest {

    private final PeriodoAcademicoService service;

    public PeriodoAcademicoRest(PeriodoAcademicoService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<PeriodoAcademico>> listar() {
        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PeriodoAcademico> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<PeriodoAcademico> registrar(
            @RequestBody PeriodoAcademico periodo) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.registrar(periodo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PeriodoAcademico> actualizar(
            @PathVariable Integer id,
            @RequestBody PeriodoAcademico periodo) {
        return ResponseEntity.ok(service.actualizar(id, periodo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
