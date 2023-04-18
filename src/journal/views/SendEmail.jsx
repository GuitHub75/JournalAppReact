
import { Mandrill } from 'mandrill-api'
import React, { useState } from "react";
import { Buffer } from 'buffer';

 export const SendEmail = () => {

  const apimd = new Mandrill("Wt_XKvUnRBpY6pyHMa9j-w", false);

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [subject, setSubject] = useState("");
    const [body, setBody] = useState("");
    const [sent, setSent] = useState(false);

    const templateName = "CRMRecompra";


    const sendMailToLead = async () => {
      try {
        
        const template = await apimd.templates.info({ name: "CRMRecompra"});

        const msg = {
          from_email: "info@yovendorecarga.com",
          from_name: "YoVendoRecarga.com",
          auto_text: false,
          subject: subject,
          to: [
            {
              email: email,
              name: name,
              type: "to",
            },
          ],
          merge_language: "mailchimp",
          merge: true,
          global_merge_vars: [
            {
              name: "NAME",
              content: name,
            },
            {
              name: "BODY",
              content: body,
            },
          ]
        };
        const resp = await apimd.messages.sendTemplate(msg, template.name, null);
        console.log(resp);
        setSent(true);
      } catch (ex) {
        console.error(ex);
        setSent(false);
      }
    };
  
      return (
        <div>
          <h1>Enviar correo</h1>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Nombre:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Asunto:
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </label>
          <label>
            Cuerpo:
            <textarea value={body} onChange={(e) => setBody(e.target.value)} />
          </label>
          <button onClick={sendMailToLead}>Enviar</button>
          {sent && <p>Correo enviado correctamente</p>}
          {!sent && <p>Error al enviar el correo</p>}
        </div>
      );
}

