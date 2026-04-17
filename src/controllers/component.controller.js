const componentModel = require("../db/models/components.model");
const { auditLog } = require("./auth.controller");

async function getAddComponent(req, res) {
  res.render("addComponent", { title: "Add Component" });
}

async function postAddComponent(req, res) {
  try {
    const { name, type, description, status, image } = req.body;
    const component = await componentModel.create({
      name,
      type,
      description,
      status,
      image,
    });
    await auditLog(req, `Added component: ${name}`, req.user);
    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getEditComponent(req, res) {
  try {
    const { id } = req.params;
    const component = await componentModel.findById(id);
    res.render("editComponent", { title: "Edit Component", component });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function postEditComponent(req, res) {
  try {
    const { id } = req.params;
    const { name, type, description, status, image } = req.body;
    const component = await componentModel.findByIdAndUpdate(
      id,
      {
        name,
        type,
        description,
        status,
        image,
      },
      { new: true },
    );
    await auditLog(req, `Edited component: ${name}`, req.user);
    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function deleteComponent(req, res) {
  try {
    const { id } = req.body;
    const component = await componentModel.findById(id);
    if (!component) {
      await auditLog(req, `Failed to delete component - not found`, req.user);
      return res.status(404).json({ message: "Component not found" });
    }
    component.status = "inactive";
    await component.save();
    await auditLog(req, `Deleted component: ${component.name}`, req.user);
    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function getRestoreComponent(req, res) {
  try {
    const { id } = req.body;
    const component = await componentModel.findById(id);
    if (!component) {
      await auditLog(req, `Failed to restore component - not found`, req.user);
      return res.status(404).json({ message: "Component not found" });
    }
    component.status = "active";
    await component.save();
    await auditLog(req, `Restored component: ${component.name}`, req.user);
    res.redirect("/secure/admin?success=1");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAddComponent,
  postAddComponent,
  getEditComponent,
  postEditComponent,
  deleteComponent,
  getRestoreComponent,
};
