exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM karyawan',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('karyawan',{page_title:"Daftar Karyawan",data:rows});


         });


    });

};

exports.add = function(req, res){
  res.render('add_karyawan',{page_title:"Tambah Karyawan"});
};

exports.edit = function(req, res){

    var nik = req.params.nik;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM karyawan WHERE nik = ?',[nik],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('update_karyawan',{page_title:"Edit Karyawan",data:rows});


         });

    });
};


exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            nik       : input.nik,
            nama      : input.nama,
            alamat    : input.alamat,
            Jkel      : input.Jkel,
            tgl_lahir : input.tgl_lahir

        };

        var query = connection.query("INSERT INTO karyawan set ? ",data, function(err, rows)
        {

          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/karyawan');

        });


    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var nik = req.params.nik;

    req.getConnection(function (err, connection) {

        var data = {

          nama      : input.nama,
          alamat    : input.alamat,
          Jkel      : input.Jkel,
          tgl_lahir : input.tgl_lahir

        };

        connection.query("UPDATE karyawan set ? WHERE nik = ? ",[data,nik], function(err, rows)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/karyawan');

        });

    });
};


exports.delete_customer = function(req,res){

     var nik = req.params.nik;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM karyawan WHERE nik = ? ",[nik], function(err, rows)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/karyawan');

        });

     });
};
