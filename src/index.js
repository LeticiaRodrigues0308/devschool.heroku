import db from './db.js';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json());


app.get('/matricula', async(req, resp) => {
    try {
        let matriculas = await db.tb_matricula.findAll({order: [['id_matricula', 'desc']]});
        resp.send(matriculas)
    } catch (e) {
        resp.send({erro: e.toString()})
    }
})

app.post('/matricula', async (req, resp) => {
    try {
        let {nome, chamada, curso, turma} = req.body;

        let a = await db.tb_matricula.findOne({ where: { nm_aluno: req.body.nome, nr_chamada: req.body.chamada, nm_turma: req.body.turma } });
        if (a != null)
            return resp.send({ erro: 'Aluno já existe!' });


        if(!nome || nome == '') {
            return resp.send({erro: 'Campo nome é obrigatório'})
        }

        if(!chamada || chamada == '') {
            return resp.send({erro: 'Campo chamada é obrigatório'})
        }

        if(!curso || curso == '') {
            return resp.send({erro: 'Campo curso é obrigatório'})
        }

        if(!turma || turma == '') {
            return resp.send({erro: 'Campo turma é obrigatório'})
        }

        if(chamada <= 0) {
            return resp.send({erro: 'Número de chamada inválido'})
        }

        let r = await db.tb_matricula.create({
            nm_aluno: nome,
            nr_chamada: chamada,
            nm_curso: curso,
            nm_turma: turma
        })
        resp.send(r)
    } catch (e) {
        resp.send('Ocorreu um erro')
    }
});

app.put('/matricula/:id', async (req, resp) => {
    try {
        let {nome, chamada, curso, turma} = req.body;
        let {id} = req.params;
        // extraindo o id dentro de req.params

        let r = await db.tb_matricula.update(
            {
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso,
                nm_turma: turma  
            },
            {
                where: {id_matricula: id}
            });
            resp.sendStatus(200);
    } catch (e) {
        resp.send({erro: e.toString()})
    }
})

app.delete('/matricula/:id', async (req, resp) =>{
    try {
        let {id} = req.params;

        let r = await db.tb_matricula.destroy({where: {id_matricula: req.params.id}});
        resp.sendStatus(200);
    } catch (e) {
        resp.send({erro: e.toString()});
    }
})

app.listen(process.env.PORT,

x => console.log(`Server up at port ${process.env.PORT}`))