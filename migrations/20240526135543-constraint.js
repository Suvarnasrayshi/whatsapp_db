'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // queryInterface.addConstraint('contacts', {
    //   fields: ['user_id'],
    //   type: 'foreign key',
    //   name: 'custom_fkey_constraint_contact_user',
    //   references: { 
    //     table: 'users',
    //     field: 'id'
    //   },
    //   onDelete: 'cascade',
    //   onUpdate: 'cascade'
    // });



    queryInterface.addConstraint('contacts', {
      fields: ['contact_user_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_contact',
      references: { 
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });



    queryInterface.addConstraint('messages', {
      fields: ['sender_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_senderid',
      references: { 
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });


    queryInterface.addConstraint('messages', {
      fields: ['receiver_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_receiverid',
      references: { 
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });


    
    queryInterface.addConstraint('groupmessages', {
      fields: ['group_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_messagegroupid',
      references: { 
        table: 'groups',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });


    queryInterface.addConstraint('groupmessages', {
      fields: ['sender_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_sender_id',
      references: { 
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  

    queryInterface.addConstraint('groupusers', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_user_id',
      references: { 
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

  },

  async down (queryInterface, Sequelize) {
   
  }
};
