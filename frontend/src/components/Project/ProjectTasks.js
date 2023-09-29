import { AccordionProvider } from "../../contexts/accordionContext";
import { AccordionHeader, AccordionItem, AccordionPanel } from "../Accordion";

const ProjectRoles = () => {
  return (
    <div>
      <AccordionProvider>
        <AccordionItem>
          <AccordionHeader>Construction cleaning</AccordionHeader>
          <AccordionPanel></AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionHeader>Painting</AccordionHeader>
          <AccordionPanel></AccordionPanel>
        </AccordionItem>
      </AccordionProvider>
    </div>
  );
};

export default ProjectRoles;
